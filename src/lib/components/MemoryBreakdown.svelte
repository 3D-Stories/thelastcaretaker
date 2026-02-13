<script lang="ts">
	import type { MemoryAllocation } from '$lib/types';

	let {
		allocations
	}: {
		allocations: MemoryAllocation[];
	} = $props();

	const traitLabels: Record<string, string> = {
		adaptability: 'Ada',
		creativity: 'Cre',
		communication: 'Com',
		discipline: 'Dis',
		empathy: 'Emp',
		focus: 'Foc',
		leadership: 'Lea',
		logic: 'Log',
		patience: 'Pat',
		wisdom: 'Wis'
	};

	const totalItems = $derived(allocations.reduce((sum, a) => sum + a.quantity, 0));

	function getTraitSummary(alloc: MemoryAllocation): string {
		const parts: string[] = [];
		for (const [key, label] of Object.entries(traitLabels)) {
			const val = alloc.memory.traits[key as keyof typeof alloc.memory.traits];
			if (val > 0) {
				parts.push(`${label}+${val * alloc.quantity}`);
			}
		}
		return parts.join(', ');
	}
</script>

{#if allocations.length > 0}
	<div class="breakdown">
		<h4 class="section-title">
			Memory Items
			<span class="count">({totalItems} items)</span>
		</h4>

		<table>
			<thead>
				<tr>
					<th>Memory Item</th>
					<th>Qty</th>
					<th>Traits Provided</th>
				</tr>
			</thead>
			<tbody>
				{#each allocations as alloc}
					<tr>
						<td class="item-cell">
							<img class="item-icon" src={alloc.memory.icon} alt={alloc.memory.name} />
							{alloc.memory.name}
						</td>
						<td class="qty-cell">{alloc.quantity}</td>
						<td class="traits-cell">{getTraitSummary(alloc)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.breakdown {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.item-cell {
		display: flex;
		align-items: center;
		font-weight: 500;
	}

	.qty-cell {
		font-weight: 600;
		text-align: center;
		color: var(--accent);
		font-size: 1rem;
	}

	.traits-cell {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}
</style>
