<script lang="ts">
	import type { PhysicalStats, PsychTraits } from '$lib/types';

	type StatEntry = { label: string; achieved: number; required: number };

	let {
		achievedStats,
		requiredStats,
		achievedTraits,
		requiredTraits
	}: {
		achievedStats: PhysicalStats;
		requiredStats: PhysicalStats;
		achievedTraits: PsychTraits;
		requiredTraits: PsychTraits;
	} = $props();

	const physicalLabels: Record<keyof PhysicalStats, string> = {
		weight: 'Weight',
		height: 'Height',
		lifeExp: 'Life Exp.',
		strength: 'Strength',
		intellect: 'Intellect'
	};

	const traitLabels: Record<keyof PsychTraits, string> = {
		adaptability: 'Adaptability',
		creativity: 'Creativity',
		communication: 'Communication',
		discipline: 'Discipline',
		empathy: 'Empathy',
		focus: 'Focus',
		leadership: 'Leadership',
		logic: 'Logic',
		patience: 'Patience',
		wisdom: 'Wisdom'
	};

	const activePhysical = $derived(
		(Object.keys(physicalLabels) as (keyof PhysicalStats)[])
			.filter(k => requiredStats[k] > 0)
			.map(k => ({ label: physicalLabels[k], achieved: achievedStats[k], required: requiredStats[k] }))
	);

	const activeTraits = $derived(
		(Object.keys(traitLabels) as (keyof PsychTraits)[])
			.filter(k => requiredTraits[k] > 0)
			.map(k => ({ label: traitLabels[k], achieved: achievedTraits[k], required: requiredTraits[k] }))
	);

	function statusClass(entry: StatEntry): string {
		if (entry.achieved >= entry.required) return 'stat-met';
		return 'stat-unmet';
	}

	function surplus(entry: StatEntry): string {
		const diff = entry.achieved - entry.required;
		if (diff > 0) return `(+${diff})`;
		if (diff < 0) return `(${diff})`;
		return '';
	}
</script>

{#if activePhysical.length > 0}
	<div class="stats-section">
		<h4 class="section-title">Physical Stats</h4>
		<div class="stats-grid">
			{#each activePhysical as entry}
				<div class="stat-row {statusClass(entry)}">
					<span class="stat-label">{entry.label}</span>
					<span class="stat-values">
						<span class="stat-achieved">{entry.achieved}</span>
						<span class="stat-separator">/</span>
						<span class="stat-required">{entry.required}</span>
						{#if entry.achieved >= entry.required}
							<span class="stat-check">&#10003;</span>
						{:else}
							<span class="stat-cross">&#10007;</span>
						{/if}
						<span class="stat-surplus">{surplus(entry)}</span>
					</span>
				</div>
			{/each}
		</div>
	</div>
{/if}

{#if activeTraits.length > 0}
	<div class="stats-section">
		<h4 class="section-title">Psychological Traits</h4>
		<div class="stats-grid">
			{#each activeTraits as entry}
				<div class="stat-row {statusClass(entry)}">
					<span class="stat-label">{entry.label}</span>
					<span class="stat-values">
						<span class="stat-achieved">{entry.achieved}</span>
						<span class="stat-separator">/</span>
						<span class="stat-required">{entry.required}</span>
						{#if entry.achieved >= entry.required}
							<span class="stat-check">&#10003;</span>
						{:else}
							<span class="stat-cross">&#10007;</span>
						{/if}
						<span class="stat-surplus">{surplus(entry)}</span>
					</span>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.stats-section {
		margin-top: 16px;
	}

	.stats-grid {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		border-radius: 6px;
		background: var(--bg-secondary);
		font-size: 0.9rem;
	}

	.stat-row.stat-met {
		background: var(--success-bg);
	}

	.stat-row.stat-unmet {
		background: var(--danger-bg);
	}

	.stat-label {
		font-weight: 500;
	}

	.stat-values {
		display: flex;
		align-items: center;
		gap: 4px;
		font-variant-numeric: tabular-nums;
	}

	.stat-achieved {
		font-weight: 600;
	}

	.stat-separator {
		color: var(--text-muted);
	}

	.stat-required {
		color: var(--text-secondary);
	}

	.stat-check {
		color: var(--success);
		font-weight: bold;
		margin-left: 4px;
	}

	.stat-cross {
		color: var(--danger);
		font-weight: bold;
		margin-left: 4px;
	}

	.stat-surplus {
		font-size: 0.8rem;
		color: var(--text-muted);
		min-width: 45px;
		text-align: right;
	}
</style>
