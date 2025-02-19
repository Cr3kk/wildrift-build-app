<script>
	import { onMount } from 'svelte';
	import { writable, get } from 'svelte/store';
	import { stats } from '../../stores/stats';
	import { gold } from '../../stores/gold';
	import { passives } from '../../stores/passives';

	let items = writable({});
	let selectedTab = writable('upgraded-items');
	let checkedItems = writable({}); 

	onMount(async () => {
		try {
			const response = await fetch('/data/items_lists.json');
			const data = await response.json();
			items.set(data);
		} catch (error) {
			console.error('Error loading JSON:', error); 
		}
	});

	// Reactive statement to reset checkedItems whenever selectedTab changes
	$: {
		const currentTab = get(selectedTab);
		// Clear checked items when the selected tab changes
		checkedItems.set({});
	}

	function toggleItem(event, item) {
		stats.update(currentStats => {
			const modifier = event.target.checked ? 1 : -1;
			return {
				...currentStats,
				HP: currentStats.HP + modifier * (item.stats.health || 0),
				AD: currentStats.AD + modifier * (item.stats["attack damage"] || 0),
				AP: currentStats.AP + modifier * (item.stats["ability power"] || 0),
				AR: currentStats.AR + modifier * (item.stats.armor || 0),
				MR: currentStats.MR + modifier * (item.stats["magic resist"] || 0),
				MPR: currentStats.MPR + modifier * (item.stats["magic penetration"] || 0),
				APR: currentStats.APR + modifier * (item.stats["armor penetration"] || 0),
				PV: currentStats.PV + modifier * (item.stats["physical vamp"] || 0),
				AS: currentStats.AS + modifier * (item.stats["attack speed"] || 0),
				CR: currentStats.CR + modifier * (item.stats["crit chance"] || 0),
				AH: currentStats.AH + modifier * (item.stats["ability haste"] || 0),
				MA: currentStats.MA + modifier * (item.stats.mana || 0),
				MRE: currentStats.MRE + modifier * (item.stats["mana regen"] || 0),
				HR: currentStats.HR + modifier * (item.stats["health regen"] || 0),
				HSS: currentStats.HSS + modifier * (item.stats["heal and shield strength"] || 0),
				MS: currentStats.MS + modifier * (item.stats["movement speed"] || 0)
			};
		});

		passives.update(currentPassives => {
			if (event.target.checked) {
				return [...currentPassives, ...item.passives];
			} else {
				return currentPassives.filter(passive => !item.passives.includes(passive));
			}
		});

		gold.update(currentGold => {
			return event.target.checked ? currentGold + item.price : currentGold - item.price;
		});

		// Update checkedItems store
		checkedItems.update(current => {
			return { ...current, [item.name]: event.target.checked }; // Use a unique identifier
		});
	}
</script>

<main>
	<h1>Items</h1>

	<div class="tabs">
		{#each ['upgraded-items', 'mid-tier-items', 'basic-items', 'support-items', 'boots'] as tab}
			<button class={($selectedTab === tab ? 'active' : '')} onclick={() => selectedTab.set(tab)}>
				{tab.replace('-', ' ')}
			</button>
		{/each}
	</div>

	<div class="items-container">
		{#if $items && $items[$selectedTab]}
			{#each Object.entries($items[$selectedTab]) as [key, item]}
				<div class="item">
					<div class="item-card">
						<h2>{item.name}</h2>
						<p>Price: {item.price} gold</p>
					</div>
					<div class="item-select">
						<input 
							type="checkbox" 
							name={key} 
							id={key} 
							checked={$checkedItems[item.name] || false} 
							onchange={event => toggleItem(event, item)}
						>
					</div>
				</div>
			{/each}
		{:else}
			<p>Loading items...</p>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		margin-left: 250px;
		width: 100%;
	}

	h1 {
		text-align: center;
		margin: auto;
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 20px;
	}

	.tabs button {
		padding: 10px 20px;
		border: none;
		background: #ddd;
		cursor: pointer;
		border-radius: 5px;
	}

	.tabs .active {
		background: #555;
		color: white;
	}

	.items-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 20px;
		padding: 40px;
		max-height: 80vh;
		overflow-y: auto;
		width: 130vh;
		justify-content: center;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 5px;
	}

	.item-card {
		border: 1px solid #ccc;
		padding: 15px;
		border-radius: 8px;
		background: #f9f9f9;
		text-align: center;
	}

	.item-card h2 {
		margin: 0;
		font-size: 1em;
	}

	.item-card p {
		margin: 0;
		font-size: 0.9em;
	}

	.item-select {
		margin-top: 5px;
	}
</style>
