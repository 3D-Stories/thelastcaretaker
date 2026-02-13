import solver from 'javascript-lp-solver';
import type {
	FoodItem, MemoryItem, PhysicalStats, PsychTraits, Ingredients,
	FoodAllocation, MemoryAllocation, OptimizationResult
} from '$lib/types';
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

	const totalFoodItems = foodAllocations.reduce((sum, a) => sum + a.quantity, 0);
	const totalMemoryItems = memoryAllocations.reduce((sum, a) => sum + a.quantity, 0);

	const foodFeasible = !hasAnyRequirement(physicalReqs, physicalStatKeys) || foodAllocations.length > 0;
	const memoryFeasible = !hasAnyRequirement(traitReqs, traitKeys) || memoryAllocations.length > 0;

	return {
		feasible: foodFeasible && memoryFeasible,
		foodAllocations,
		memoryAllocations,
		totalFoodItems,
		totalMemoryItems,
		totalItems: totalFoodItems + totalMemoryItems,
		achievedStats: computeAchievedStats(foodAllocations),
		achievedTraits: computeAchievedTraits(memoryAllocations),
		totalIngredients: computeTotalIngredients(foodAllocations)
	};
}

export { physicalStatKeys, traitKeys, ingredientKeys };
