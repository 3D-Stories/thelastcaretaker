<script lang="ts">
	import { professions, professionCategories } from '$lib/data/professions';
	import type { Profession, ProfessionCategory } from '$lib/types';

	let {
		selectedProfession = $bindable<Profession | null>(null)
	}: {
		selectedProfession: Profession | null;
	} = $props();

	let selectedCategory = $state<ProfessionCategory | ''>('');

	const filteredProfessions = $derived(
		selectedCategory
			? professions.filter(p => p.category === selectedCategory)
			: []
	);

	function onCategoryChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value as ProfessionCategory | '';
		selectedCategory = value;
		selectedProfession = null;
	}

	function onProfessionChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		selectedProfession = professions.find(p => p.name === value) ?? null;
	}

	function tierBadgeClass(tier: string): string {
		return `badge badge-${tier.toLowerCase()}`;
	}
</script>

<div class="picker-container">
	<div class="picker-row">
		<div class="picker-field">
			<label for="category-select">Category</label>
			<select id="category-select" onchange={onCategoryChange} value={selectedCategory}>
				<option value="">-- Select Category --</option>
				{#each professionCategories as cat}
					<option value={cat}>{cat}</option>
				{/each}
			</select>
		</div>

		<div class="picker-field">
			<label for="profession-select">Profession</label>
			<select
				id="profession-select"
				onchange={onProfessionChange}
				value={selectedProfession?.name ?? ''}
				disabled={!selectedCategory}
			>
				<option value="">-- Select Profession --</option>
				{#each filteredProfessions as prof}
					<option value={prof.name}>{prof.name} ({prof.tier})</option>
				{/each}
			</select>
		</div>
	</div>

	{#if selectedProfession}
		<div class="selected-info">
			<span class={tierBadgeClass(selectedProfession.tier)}>{selectedProfession.tier}</span>
			<span class="profession-name">{selectedProfession.name}</span>
			<span class="profession-category">{selectedProfession.category}</span>
		</div>
	{/if}
</div>

<style>
	.picker-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.picker-row {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.picker-field {
		flex: 1;
		min-width: 220px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		font-weight: 600;
	}

	select:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.selected-info {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 16px;
		background: var(--bg-secondary);
		border-radius: 8px;
		border: 1px solid var(--border);
	}

	.profession-name {
		font-weight: 600;
		font-size: 1.05rem;
	}

	.profession-category {
		color: var(--text-secondary);
		font-size: 0.9rem;
	}
</style>
