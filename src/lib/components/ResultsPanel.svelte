<script lang="ts">
	import type { Profession, OptimizationResult } from '$lib/types';
	import FoodBreakdown from './FoodBreakdown.svelte';
	import MemoryBreakdown from './MemoryBreakdown.svelte';
	import StatsTable from './StatsTable.svelte';

	let {
		profession,
		result
	}: {
		profession: Profession;
		result: OptimizationResult;
	} = $props();

	let activeTab = $state<'optimal' | 'capped'>('optimal');

	const showMemoryAllocations = $derived(
		activeTab === 'capped' ? result.memoryAllocationsCapped : result.memoryAllocations
	);
	const showAchievedTraits = $derived(
		activeTab === 'capped' ? result.achievedTraitsCapped : result.achievedTraits
	);
	const showTotalMemoryItems = $derived(
		activeTab === 'capped' ? result.totalMemoryItemsCapped : result.totalMemoryItems
	);
	const showTotalItems = $derived(
		activeTab === 'capped' ? result.totalItemsCapped : result.totalItems
	);
	const showFeasible = $derived(
		activeTab === 'capped'
			? (result.feasible && result.cappedFeasible) || (!result.feasible && result.cappedFeasible)
			: result.feasible
	);
	const cappedInfeasible = $derived(
		activeTab === 'capped' && !result.cappedFeasible
	);
</script>

<div class="results">
	{#if !result.feasible && !result.cappedFeasible}
		<div class="card error-card">
			<h3>Optimization Failed</h3>
			<p>No feasible solution found for this profession's requirements. This may indicate a data error.</p>
		</div>
	{:else}
		<div class="total-summary card">
			<h3>Optimal Build</h3>
			<div class="total-count">
				<span class="total-number">{showTotalItems}</span>
				<span class="total-label">total items</span>
			</div>
			<div class="total-breakdown">
				{#if result.totalFoodItems > 0}
					<span class="sub-count">{result.totalFoodItems} food</span>
				{/if}
				{#if showTotalMemoryItems > 0}
					<span class="sub-count">{showTotalMemoryItems} memories</span>
				{/if}
			</div>
		</div>

		{#if result.foodAllocations.length > 0}
			<div class="card">
				<FoodBreakdown
					allocations={result.foodAllocations}
					totalIngredients={result.totalIngredients}
				/>
			</div>
		{/if}

		<div class="tab-bar">
			<button
				class="tab-btn"
				class:active={activeTab === 'optimal'}
				onclick={() => activeTab = 'optimal'}
			>
				Optimal ({result.totalMemoryItems} memories)
			</button>
			<button
				class="tab-btn"
				class:active={activeTab === 'capped'}
				onclick={() => activeTab = 'capped'}
			>
				Max 3 Each ({result.cappedFeasible ? result.totalMemoryItemsCapped + ' memories' : 'infeasible'})
			</button>
		</div>

		{#if cappedInfeasible}
			<div class="card error-card">
				<h3>Capped Solution Infeasible</h3>
				<p>Cannot meet this profession's trait requirements with a maximum of 3 copies per memory type.</p>
			</div>
		{:else}
			<div class="card">
				<StatsTable
					achievedStats={result.achievedStats}
					requiredStats={profession.physicalReqs}
					achievedTraits={showAchievedTraits}
					requiredTraits={profession.traitReqs}
				/>
			</div>

			{#if showMemoryAllocations.length > 0}
				<div class="card">
					<MemoryBreakdown allocations={showMemoryAllocations} />
				</div>
			{/if}
		{/if}
	{/if}
</div>

<style>
	.results {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.error-card {
		border-color: var(--danger);
		background: var(--danger-bg);
	}

	.error-card h3 {
		color: var(--danger);
		margin-bottom: 8px;
	}

	.error-card p {
		color: var(--text-secondary);
	}

	.total-summary {
		text-align: center;
		border-color: var(--border-highlight);
		background: linear-gradient(135deg, var(--bg-card), rgba(59, 130, 246, 0.08));
	}

	.total-summary h3 {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		margin-bottom: 8px;
	}

	.total-count {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.total-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--accent);
		line-height: 1;
	}

	.total-label {
		font-size: 1rem;
		color: var(--text-secondary);
	}

	.total-breakdown {
		display: flex;
		justify-content: center;
		gap: 16px;
	}

	.sub-count {
		font-size: 0.9rem;
		color: var(--text-muted);
		padding: 4px 12px;
		background: var(--bg-secondary);
		border-radius: 20px;
	}

	.tab-bar {
		display: flex;
		gap: 4px;
		background: var(--bg-secondary);
		border-radius: 10px;
		padding: 4px;
	}

	.tab-btn {
		flex: 1;
		padding: 10px 16px;
		border: none;
		border-radius: 8px;
		background: transparent;
		color: var(--text-secondary);
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.tab-btn:hover {
		color: var(--text-primary);
		background: var(--bg-hover);
	}

	.tab-btn.active {
		background: var(--accent);
		color: white;
		box-shadow: 0 2px 8px var(--accent-glow);
	}
</style>
