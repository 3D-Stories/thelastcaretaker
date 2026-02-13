<script lang="ts">
	import type { ProfessionMatch, Ingredients } from '$lib/types';
	import { ingredientKeys } from '$lib/solver';

	let {
		matches
	}: {
		matches: ProfessionMatch[];
	} = $props();

	let expandedIndex = $state<number | null>(null);

	function toggle(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}

	const achievableCount = $derived(matches.filter(m => m.achievable).length);

	const ingredientLabels: Record<keyof Ingredients, string> = {
		carbohydrate: 'Carbohydrate',
		fat: 'Fat',
		protein: 'Protein',
		calcium: 'Calcium',
		omega3: 'Omega-3',
		vitaminD: 'Vitamin D',
		bioregulator: 'Bioregulator',
		mitoAmplifier: 'Mito. Amplifier',
		naniteNutrient: 'Nanite Nutrient'
	};

	const ingredientIcons: Record<keyof Ingredients, string> = {
		carbohydrate: '/icons/ingredients/Carbohydrate.png',
		fat: '/icons/ingredients/Fat.png',
		protein: '/icons/ingredients/Protein.png',
		calcium: '/icons/ingredients/Calcium.png',
		omega3: '/icons/ingredients/Omega-3.png',
		vitaminD: '/icons/ingredients/Vitamin_D.png',
		bioregulator: '/icons/ingredients/Bioregulator.png',
		mitoAmplifier: '/icons/ingredients/Mitochondrial_Amplifier.png',
		naniteNutrient: '/icons/ingredients/Nanite_Nutrient.png'
	};

	function tierClass(tier: string): string {
		return `badge badge-${tier.toLowerCase()}`;
	}

	function activeIngredients(totalIngredients: Ingredients) {
		return ingredientKeys.filter(k => totalIngredients[k] > 0);
	}
</script>

<div class="ranking">
	<h3 class="section-title">
		Profession Results
		<span class="count">({achievableCount} achievable of {matches.length})</span>
	</h3>

	{#if matches.length === 0}
		<p class="empty-msg">Add memories to your inventory to see which professions you can achieve.</p>
	{:else}
		<div class="match-list">
			{#each matches as match, i}
				{@const expanded = expandedIndex === i}
				<div class="match-card" class:achievable={match.achievable} class:partial={!match.achievable}>
					<button class="match-header" onclick={() => toggle(i)}>
						<div class="match-info">
							<span class={tierClass(match.profession.tier)}>{match.profession.tier}</span>
							<span class="match-name">{match.profession.name}</span>
							<span class="match-category">{match.profession.category}</span>
						</div>
						<div class="match-status">
							{#if match.achievable}
								<span class="status-badge achievable-badge">
									{match.totalMemoryItems} mem{match.totalFoodItems > 0 ? ` + ${match.totalFoodItems} food` : ''}
								</span>
							{:else}
								<span class="status-badge partial-badge">{match.traitCoverage}% traits</span>
							{/if}
							<span class="expand-arrow" class:expanded>{expanded ? '\u25B2' : '\u25BC'}</span>
						</div>
					</button>

					{#if expanded}
						<div class="match-details">
							{#if match.achievable}
								{#if match.memoryAllocations.length > 0}
									<div class="detail-section">
										<h4 class="detail-title">Memory Items Needed ({match.totalMemoryItems} items)</h4>
										<div class="food-list">
											{#each match.memoryAllocations as alloc}
												<div class="food-item">
													<img class="item-icon" src={alloc.memory.icon} alt={alloc.memory.name} />
													<span class="food-name">{alloc.memory.name}</span>
													<span class="food-qty">x{alloc.quantity}</span>
												</div>
											{/each}
										</div>
									</div>
								{/if}

								{#if match.foodAllocations.length > 0}
									<div class="detail-section">
										<h4 class="detail-title">Food Items Needed ({match.totalFoodItems} items)</h4>
										<div class="food-list">
											{#each match.foodAllocations as alloc}
												<div class="food-item">
													<img class="item-icon" src={alloc.food.icon} alt={alloc.food.name} />
													<span class="food-name">{alloc.food.name}</span>
													<span class="food-qty">x{alloc.quantity}</span>
												</div>
											{/each}
										</div>
									</div>
									{@const active = activeIngredients(match.totalIngredients)}
									{#if active.length > 0}
										<div class="detail-section">
											<h4 class="detail-title">Crafting Materials</h4>
											<div class="ingredients-grid">
												{#each active as key}
													<div class="ingredient-item">
														<img class="item-icon" src={ingredientIcons[key]} alt={ingredientLabels[key]} />
														<span class="ingredient-name">{ingredientLabels[key]}</span>
														<span class="ingredient-qty">{match.totalIngredients[key]}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}
								{:else}
									<p class="no-food-msg">No physical stat requirements — only memories needed.</p>
								{/if}
							{:else}
								<div class="detail-section">
									<h4 class="detail-title">Trait Shortfalls</h4>
									<div class="shortfall-list">
										{#each match.shortfalls as sf}
											<div class="shortfall-row">
												<span class="shortfall-trait">{sf.trait}</span>
												<span class="shortfall-values">
													<span class="sf-have">{sf.have}</span>
													<span class="sf-sep">/</span>
													<span class="sf-need">{sf.need}</span>
													<span class="sf-diff">(-{sf.need - sf.have})</span>
												</span>
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.ranking {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.empty-msg {
		text-align: center;
		color: var(--text-muted);
		padding: 24px;
	}

	.match-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.match-card {
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		transition: border-color 0.2s;
	}

	.match-card.achievable {
		border-color: rgba(34, 197, 94, 0.3);
	}

	.match-card.partial {
		border-color: rgba(245, 158, 11, 0.2);
	}

	.match-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 14px;
		background: var(--bg-card);
		border: none;
		color: var(--text-primary);
		cursor: pointer;
		font-size: 0.9rem;
		text-align: left;
		transition: background 0.15s;
	}

	.match-header:hover {
		background: var(--bg-hover);
	}

	.match-info {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}

	.match-name {
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.match-category {
		font-size: 0.8rem;
		color: var(--text-muted);
		white-space: nowrap;
	}

	.match-status {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.status-badge {
		padding: 3px 10px;
		border-radius: 12px;
		font-size: 0.78rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.achievable-badge {
		background: var(--success-bg);
		color: var(--success);
	}

	.partial-badge {
		background: rgba(245, 158, 11, 0.12);
		color: var(--warning);
	}

	.expand-arrow {
		color: var(--text-muted);
		font-size: 0.7rem;
		transition: transform 0.2s;
	}

	.match-details {
		padding: 14px;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.detail-section {
		margin-bottom: 12px;
	}

	.detail-section:last-child {
		margin-bottom: 0;
	}

	.detail-title {
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		margin-bottom: 8px;
	}

	.food-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.food-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		background: var(--bg-card);
		border-radius: 6px;
		font-size: 0.85rem;
	}

	.food-name {
		flex: 1;
		font-weight: 500;
	}

	.food-qty {
		font-weight: 600;
		color: var(--accent);
	}

	.ingredients-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 6px;
	}

	.ingredient-item {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		background: var(--bg-card);
		border-radius: 6px;
		font-size: 0.82rem;
	}

	.ingredient-name {
		flex: 1;
	}

	.ingredient-qty {
		font-weight: 600;
		color: var(--accent);
	}

	.no-food-msg {
		color: var(--success);
		font-size: 0.85rem;
		padding: 4px 0;
	}

	.shortfall-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.shortfall-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 10px;
		background: var(--danger-bg);
		border-radius: 6px;
		font-size: 0.85rem;
	}

	.shortfall-trait {
		font-weight: 500;
		color: var(--text-primary);
	}

	.shortfall-values {
		display: flex;
		align-items: center;
		gap: 4px;
		font-variant-numeric: tabular-nums;
	}

	.sf-have {
		color: var(--danger);
		font-weight: 600;
	}

	.sf-sep {
		color: var(--text-muted);
	}

	.sf-need {
		color: var(--text-secondary);
	}

	.sf-diff {
		color: var(--danger);
		font-size: 0.78rem;
		margin-left: 4px;
	}
</style>
