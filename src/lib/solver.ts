import solver from 'javascript-lp-solver';
import type {
	FoodItem, MemoryItem, PhysicalStats, PsychTraits, Ingredients,
	FoodAllocation, MemoryAllocation, OptimizationResult, ProfessionMatch, TraitShortfall
} from '$lib/types';
import { professions } from '$lib/data/professions';
import { foodItems } from '$lib/data/food';
import { memoryItems } from '$lib/data/memories';

const physicalStatKeys: (keyof PhysicalStats)[] = ['weight', 'height', 'lifeExp', 'strength', 'intellect'];
const traitKeys: (keyof PsychTraits)[] = ['adaptability', 'creativity', 'communication', 'discipline', 'empathy', 'focus', 'leadership', 'logic', 'patience', 'wisdom'];
const ingredientKeys: (keyof Ingredients)[] = ['carbohydrate', 'fat', 'protein', 'calcium', 'omega3', 'vitaminD', 'bioregulator', 'mitoAmplifier', 'naniteNutrient'];

function hasAnyRequirement(reqs: Record<string, number>, keys: string[]): boolean {
	return keys.some(k => (reqs as Record<string, number>)[k] > 0);
}

function optimizeFood(requirements: PhysicalStats): FoodAllocation[] {
	if (!hasAnyRequirement(requirements, physicalStatKeys)) {
		return [];
	}

	const constraints: Record<string, { min: number }> = {};
	for (const key of physicalStatKeys) {
		if (requirements[key] > 0) {
			constraints[key] = { min: requirements[key] };
		}
	}

	const variables: Record<string, Record<string, number>> = {};
	const ints: Record<string, number> = {};

	for (const food of foodItems) {
		const varName = food.name;
		variables[varName] = { totalItems: 1 };
		for (const key of physicalStatKeys) {
			if (food.stats[key] > 0) {
				variables[varName][key] = food.stats[key];
			}
		}
		ints[varName] = 1;
	}

	const model = {
		optimize: 'totalItems',
		opType: 'min' as const,
		constraints,
		variables,
		ints
	};

	const result = solver.Solve(model);

	if (!result.feasible) {
		return [];
	}

	const allocations: FoodAllocation[] = [];
	for (const food of foodItems) {
		const qty = Math.round(result[food.name] || 0);
		if (qty > 0) {
			allocations.push({ item: food.name, quantity: qty, food });
		}
	}

	return allocations.sort((a, b) => b.quantity - a.quantity);
}

function optimizeMemories(requirements: PsychTraits): MemoryAllocation[] {
	if (!hasAnyRequirement(requirements, traitKeys)) {
		return [];
	}

	const constraints: Record<string, { min: number }> = {};
	for (const key of traitKeys) {
		if (requirements[key] > 0) {
			constraints[key] = { min: requirements[key] };
		}
	}

	const variables: Record<string, Record<string, number>> = {};
	const ints: Record<string, number> = {};

	for (const memory of memoryItems) {
		// Skip memories that provide no useful traits
		const hasUsefulTrait = traitKeys.some(k => memory.traits[k] > 0 && requirements[k] > 0);
		if (!hasUsefulTrait) continue;

		const varName = memory.name;
		variables[varName] = { totalItems: 1 };
		for (const key of traitKeys) {
			if (memory.traits[key] > 0) {
				variables[varName][key] = memory.traits[key];
			}
		}
		ints[varName] = 1;
	}

	const model = {
		optimize: 'totalItems',
		opType: 'min' as const,
		constraints,
		variables,
		ints
	};

	const result = solver.Solve(model);

	if (!result.feasible) {
		return [];
	}

	const allocations: MemoryAllocation[] = [];
	for (const memory of memoryItems) {
		const qty = Math.round(result[memory.name] || 0);
		if (qty > 0) {
			allocations.push({ item: memory.name, quantity: qty, memory });
		}
	}

	return allocations.sort((a, b) => b.quantity - a.quantity);
}

// Minimize the number of distinct memory types used (big-M formulation)
function optimizeMemoriesMinUnique(requirements: PsychTraits): MemoryAllocation[] {
	if (!hasAnyRequirement(requirements, traitKeys)) {
		return [];
	}

	const BIG_M = 200;
	const constraints: Record<string, { min?: number; max?: number }> = {};
	const variables: Record<string, Record<string, number>> = {};
	const ints: Record<string, number> = {};

	// Trait requirement constraints
	for (const key of traitKeys) {
		if (requirements[key] > 0) {
			constraints[key] = { min: requirements[key] };
		}
	}

	for (const memory of memoryItems) {
		const hasUsefulTrait = traitKeys.some(k => memory.traits[k] > 0 && requirements[k] > 0);
		if (!hasUsefulTrait) continue;

		const qtyVar = memory.name;
		const usedVar = `used_${memory.name}`;
		const linkConstraint = `link_${memory.name}`;
		const binaryConstraint = `bin_${memory.name}`;

		// qty variable: contributes traits, linked to used indicator
		variables[qtyVar] = { [linkConstraint]: 1 };
		for (const key of traitKeys) {
			if (memory.traits[key] > 0) {
				variables[qtyVar][key] = memory.traits[key];
			}
		}
		ints[qtyVar] = 1;

		// used indicator variable: binary (0 or 1), counted in objective
		variables[usedVar] = {
			uniqueTypes: 1,
			[linkConstraint]: -BIG_M,
			[binaryConstraint]: 1
		};
		ints[usedVar] = 1;

		// qty <= M * used  →  qty - M*used <= 0
		constraints[linkConstraint] = { max: 0 };
		// used <= 1 (binary)
		constraints[binaryConstraint] = { max: 1 };
	}

	const model = {
		optimize: 'uniqueTypes',
		opType: 'min' as const,
		constraints,
		variables,
		ints
	};

	const result = solver.Solve(model);

	if (!result.feasible) {
		return [];
	}

	const allocations: MemoryAllocation[] = [];
	for (const memory of memoryItems) {
		const qty = Math.round(result[memory.name] || 0);
		if (qty > 0) {
			allocations.push({ item: memory.name, quantity: qty, memory });
		}
	}

	return allocations.sort((a, b) => b.quantity - a.quantity);
}

// Optimize memories constrained by available inventory quantities
function optimizeMemoriesFromInventory(requirements: PsychTraits, inventory: Record<string, number>): MemoryAllocation[] {
	if (!hasAnyRequirement(requirements, traitKeys)) {
		return [];
	}

	const constraints: Record<string, { min?: number; max?: number }> = {};
	for (const key of traitKeys) {
		if (requirements[key] > 0) {
			constraints[key] = { min: requirements[key] };
		}
	}

	const variables: Record<string, Record<string, number>> = {};
	const ints: Record<string, number> = {};

	for (const memory of memoryItems) {
		const available = inventory[memory.name] || 0;
		if (available <= 0) continue;

		const hasUsefulTrait = traitKeys.some(k => memory.traits[k] > 0 && requirements[k] > 0);
		if (!hasUsefulTrait) continue;

		const varName = memory.name;
		const capConstraint = `cap_${varName}`;
		variables[varName] = { totalItems: 1, [capConstraint]: 1 };
		for (const key of traitKeys) {
			if (memory.traits[key] > 0) {
				variables[varName][key] = memory.traits[key];
			}
		}
		constraints[capConstraint] = { max: available };
		ints[varName] = 1;
	}

	const model = {
		optimize: 'totalItems',
		opType: 'min' as const,
		constraints,
		variables,
		ints
	};

	const result = solver.Solve(model);

	if (!result.feasible) {
		return [];
	}

	const allocations: MemoryAllocation[] = [];
	for (const memory of memoryItems) {
		const qty = Math.round(result[memory.name] || 0);
		if (qty > 0) {
			allocations.push({ item: memory.name, quantity: qty, memory });
		}
	}

	return allocations.sort((a, b) => b.quantity - a.quantity);
}

function computeAchievedStats(allocations: FoodAllocation[]): PhysicalStats {
	const stats: PhysicalStats = { weight: 0, height: 0, lifeExp: 0, strength: 0, intellect: 0 };
	for (const alloc of allocations) {
		for (const key of physicalStatKeys) {
			stats[key] += alloc.food.stats[key] * alloc.quantity;
		}
	}
	return stats;
}

function computeAchievedTraits(allocations: MemoryAllocation[]): PsychTraits {
	const traits: PsychTraits = { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 0, patience: 0, wisdom: 0 };
	for (const alloc of allocations) {
		for (const key of traitKeys) {
			traits[key] += alloc.memory.traits[key] * alloc.quantity;
		}
	}
	return traits;
}

function computeTotalIngredients(allocations: FoodAllocation[]): Ingredients {
	const totals: Ingredients = { carbohydrate: 0, fat: 0, protein: 0, calcium: 0, omega3: 0, vitaminD: 0, bioregulator: 0, mitoAmplifier: 0, naniteNutrient: 0 };
	for (const alloc of allocations) {
		for (const key of ingredientKeys) {
			totals[key] += alloc.food.ingredients[key] * alloc.quantity;
		}
	}
	return totals;
}

export function optimizeBuild(physicalReqs: PhysicalStats, traitReqs: PsychTraits): OptimizationResult {
	const foodAllocations = optimizeFood(physicalReqs);
	const memoryAllocations = optimizeMemories(traitReqs);
	const memoryAllocationsMinUnique = optimizeMemoriesMinUnique(traitReqs);

	const totalFoodItems = foodAllocations.reduce((sum, a) => sum + a.quantity, 0);
	const totalMemoryItems = memoryAllocations.reduce((sum, a) => sum + a.quantity, 0);
	const totalMemoryItemsMinUnique = memoryAllocationsMinUnique.reduce((sum, a) => sum + a.quantity, 0);

	const foodFeasible = !hasAnyRequirement(physicalReqs, physicalStatKeys) || foodAllocations.length > 0;
	const memoryFeasible = !hasAnyRequirement(traitReqs, traitKeys) || memoryAllocations.length > 0;
	const minUniqueFeasible = !hasAnyRequirement(traitReqs, traitKeys) || memoryAllocationsMinUnique.length > 0;

	return {
		feasible: foodFeasible && memoryFeasible,
		foodAllocations,
		memoryAllocations,
		totalFoodItems,
		totalMemoryItems,
		totalItems: totalFoodItems + totalMemoryItems,
		achievedStats: computeAchievedStats(foodAllocations),
		achievedTraits: computeAchievedTraits(memoryAllocations),
		totalIngredients: computeTotalIngredients(foodAllocations),
		minUniqueFeasible,
		memoryAllocationsMinUnique,
		totalMemoryItemsMinUnique,
		totalItemsMinUnique: totalFoodItems + totalMemoryItemsMinUnique,
		achievedTraitsMinUnique: computeAchievedTraits(memoryAllocationsMinUnique),
		uniqueMemoryTypes: memoryAllocationsMinUnique.length
	};
}

export function rankProfessionsByInventory(inventory: Record<string, number>): ProfessionMatch[] {
	// Compute total traits from inventory
	const achievedTraits: PsychTraits = {
		adaptability: 0, creativity: 0, communication: 0, discipline: 0,
		empathy: 0, focus: 0, leadership: 0, logic: 0, patience: 0, wisdom: 0
	};

	for (const memory of memoryItems) {
		const qty = inventory[memory.name] || 0;
		if (qty <= 0) continue;
		for (const key of traitKeys) {
			achievedTraits[key] += memory.traits[key] * qty;
		}
	}

	const results: ProfessionMatch[] = [];

	for (const profession of professions) {
		const reqs = profession.traitReqs;
		const shortfalls: TraitShortfall[] = [];
		let metCount = 0;
		let requiredCount = 0;

		for (const key of traitKeys) {
			if (reqs[key] <= 0) continue;
			requiredCount++;
			if (achievedTraits[key] >= reqs[key]) {
				metCount++;
			} else {
				shortfalls.push({
					trait: key.charAt(0).toUpperCase() + key.slice(1),
					have: achievedTraits[key],
					need: reqs[key]
				});
			}
		}

		const traitCoverage = requiredCount > 0 ? Math.round((metCount / requiredCount) * 100) : 100;
		const achievable = shortfalls.length === 0;

		let memoryAllocations: MemoryAllocation[] = [];
		let totalMemoryItems = 0;
		let foodAllocations: FoodAllocation[] = [];
		let totalFoodItems = 0;
		let achievedStats: PhysicalStats = { weight: 0, height: 0, lifeExp: 0, strength: 0, intellect: 0 };
		let totalIngredients: Ingredients = {
			carbohydrate: 0, fat: 0, protein: 0, calcium: 0,
			omega3: 0, vitaminD: 0, bioregulator: 0, mitoAmplifier: 0, naniteNutrient: 0
		};

		if (achievable) {
			memoryAllocations = optimizeMemoriesFromInventory(profession.traitReqs, inventory);
			totalMemoryItems = memoryAllocations.reduce((sum, a) => sum + a.quantity, 0);
			foodAllocations = optimizeFood(profession.physicalReqs);
			totalFoodItems = foodAllocations.reduce((sum, a) => sum + a.quantity, 0);
			achievedStats = computeAchievedStats(foodAllocations);
			totalIngredients = computeTotalIngredients(foodAllocations);
		}

		results.push({
			profession,
			achievable,
			traitCoverage,
			achievedTraits: { ...achievedTraits },
			shortfalls,
			memoryAllocations,
			totalMemoryItems,
			foodAllocations,
			totalFoodItems,
			achievedStats,
			totalIngredients
		});
	}

	// Sort: achievable first (ascending by food items), then partial (descending by coverage)
	results.sort((a, b) => {
		if (a.achievable && !b.achievable) return -1;
		if (!a.achievable && b.achievable) return 1;
		if (a.achievable && b.achievable) return a.totalFoodItems - b.totalFoodItems;
		return b.traitCoverage - a.traitCoverage;
	});

	return results;
}

export { physicalStatKeys, traitKeys, ingredientKeys };
