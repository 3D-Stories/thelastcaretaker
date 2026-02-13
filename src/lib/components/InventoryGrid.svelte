<script lang="ts">
	import { memoryItems } from '$lib/data/memories';

	let {
		inventory = $bindable()
	}: {
		inventory: Record<string, number>;
	} = $props();

	function increment(name: string) {
		inventory = { ...inventory, [name]: (inventory[name] || 0) + 1 };
	}

	function decrement(name: string) {
		const current = inventory[name] || 0;
		if (current > 0) {
			inventory = { ...inventory, [name]: current - 1 };
		}
	}

	function clearAll() {
		const cleared: Record<string, number> = {};
		for (const m of memoryItems) {
			cleared[m.name] = 0;
		}
		inventory = cleared;
	}

	const totalItems = $derived(
		Object.values(inventory).reduce((sum, qty) => sum + qty, 0)
	);
</script>

<div class="inventory-header">
	<h3 class="section-title">
		Memory Inventory
		<span class="count">({totalItems} items)</span>
	</h3>
	{#if totalItems > 0}
		<button class="clear-btn" onclick={clearAll}>Clear All</button>
	{/if}
</div>

<div class="inventory-grid">
	{#each memoryItems as memory}
		{@const qty = inventory[memory.name] || 0}
		<div class="memory-cell" class:has-items={qty > 0}>
			<img class="item-icon" src={memory.icon} alt={memory.name} />
			<span class="memory-name">{memory.name}</span>
			<div class="stepper">
				<button
					class="step-btn"
					onclick={() => decrement(memory.name)}
					disabled={qty <= 0}
				>-</button>
				<span class="qty" class:qty-active={qty > 0}>{qty}</span>
				<button
					class="step-btn"
					onclick={() => increment(memory.name)}
				>+</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.inventory-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	.clear-btn {
		padding: 6px 14px;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: var(--bg-secondary);
		color: var(--text-secondary);
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.clear-btn:hover {
		border-color: var(--danger);
		color: var(--danger);
		background: var(--danger-bg);
	}

	.inventory-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 8px;
	}

	.memory-cell {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		background: var(--bg-secondary);
		border: 1px solid transparent;
		border-radius: 8px;
		transition: all 0.2s;
	}

	.memory-cell.has-items {
		border-color: var(--accent);
		background: rgba(59, 130, 246, 0.08);
	}

	.memory-name {
		flex: 1;
		font-size: 0.82rem;
		font-weight: 500;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.stepper {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
	}

	.step-btn {
		width: 26px;
		height: 26px;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--bg-card);
		color: var(--text-primary);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
		padding: 0;
		line-height: 1;
	}

	.step-btn:hover:not(:disabled) {
		border-color: var(--accent);
		background: var(--bg-hover);
	}

	.step-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.qty {
		min-width: 24px;
		text-align: center;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.qty.qty-active {
		color: var(--accent);
	}
</style>
