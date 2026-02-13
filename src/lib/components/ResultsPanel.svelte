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
</script>

<div class="results">
	{#if !result.feasible}
		<div class="card error-card">
			<h3>Optimization Failed</h3>
			<p>No feasible solution found for this profession's requirements. This may indicate a data error.</p>
		</div>
	{:else}
		<div class="total-summary card">
			<h3>Optimal Build</h3>
			<div class="total-count">
				<span class="total-number">{result.totalItems}</span>
				<span class="total-label">total items</span>
			</div>
			<div class="total-breakdown">
				{#if result.totalFoodItems > 0}
					<span class="sub-count">{result.totalFoodItems} food</span>
				{/if}
				{#if result.totalMemoryItems > 0}
					<span class="sub-count">{result.totalMemoryItems} memories</span>
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

		<div class="card">
			<StatsTable
				achievedStats={result.achievedStats}
				requiredStats={profession.physicalReqs}
				achievedTraits={result.achievedTraits}
				requiredTraits={profession.traitReqs}
			/>
		</div>

		{#if result.memoryAllocations.length > 0}
			<div class="card">
				<MemoryBreakdown allocations={result.memoryAllocations} />
			</div>
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
</style>
