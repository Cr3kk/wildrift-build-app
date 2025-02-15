<script>
	import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
	import { stats } from '/src/stores/stats.js';
	import { passives } from '../../stores/passives';
	import { gold } from '/src/stores/gold.js';
  
	let items = $state({});
  
	onMount(async () => {
	  try {
		const response = await fetch('data/items_lists.json'); // Ensure it's in "public/"
		items = await response.json();
	  } catch (error) {
		console.error('Error loading JSON:', error);
	  }
	});

	function toggleItem(event, item) {
		stats.update(currentStats => {
			if (event.target.checked) {
				return {
					...currentStats,
                    HP: currentStats.HP + item.stats.health,
                    AD: currentStats.AD + item.stats["attack damage"],
                    AP: currentStats.AP + item.stats["ability power"],
                    AR: currentStats.AR + item.stats.armor,
                    MR: currentStats.MR + item.stats["magic resist"],
                    MPR: currentStats.MPR + item.stats["magic penetration"],
                    APR: currentStats.APR + item.stats["armor penetration"],
                    PV: currentStats.PV + item.stats["physical vamp"],
                    AS: currentStats.AS + item.stats["attack speed"],
                    CR: currentStats.CR + item.stats["crit chance"],
                    AH: currentStats.AH + item.stats["ability haste"],
                    MA: currentStats.MA + item.stats.mana,
                    MRE: currentStats.MRE + item.stats["mana regen"],
                    HR: currentStats.HR + item.stats["health regen"],
                    HSS: currentStats.HSS + item.stats["heal and shield strength"],
                    MS: currentStats.MS + item.stats["movement speed"]
                };
			} else {
				return {
                    ...currentStats,
                    HP: currentStats.HP - item.stats.health,
                    AD: currentStats.AD - item.stats["attack damage"],
                    AP: currentStats.AP - item.stats["ability power"],
                    AR: currentStats.AR - item.stats.armor,
                    MR: currentStats.MR - item.stats["magic resist"],
                    MPR: currentStats.MPR - item.stats["magic penetration"],
                    APR: currentStats.APR - item.stats["armor penetration"],
                    PV: currentStats.PV - item.stats["physical vamp"],
                    AS: currentStats.AS - item.stats["attack speed"],
                    CR: currentStats.CR - item.stats["crit chance"],
                    AH: currentStats.AH - item.stats["ability haste"],
                    MA: currentStats.MA - item.stats.mana,
                    MRE: currentStats.MRE - item.stats["mana regen"],
                    HR: currentStats.HR - item.stats["health regen"],
                    HSS: currentStats.HSS - item.stats["heal and shield strength"],
                    MS: currentStats.MS - item.stats["movement speed"]
                };
			} 
		});

		passives.update(currentPassives => {
			if (event.target.checked) {
				return [...currentPassives, ...item.passives];
			} else {
				return currentPassives.filter(passive => !item.passives.includes(passive));
			}
		});

		gold.update(currentGold => {
			if (event.target.checked) {
				return currentGold + item.price;
			} else {
				return currentGold - item.price;
			}
		});
	}
</script>
  
<main>
	<h1>Items</h1>
	<div class="items-container">
		<div class="support-items">
			{#if items["upgraded-items"]}
				{#each Object.entries(items["upgraded-items"]) as [key, support_item]}
					{@render item(key, support_item)} 
				{/each}
			{/if}
		</div>
	</div>
</main>

  
{#snippet item(key, item)}
  	<div class="item">
		<div class="item-card">
			<h2>{item.name}</h2>
			<p>Price: {item.price} gold</p>
		</div>

		<div class="item-select">
			<input type="checkbox" name={key} id={key} value="no" onchange={event => toggleItem(event, item)}>
		</div>
	</div>
{/snippet}
  
<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-left: 250px;
	}

	h1 {
		text-align: center;
		margin: auto;
	}

	.items-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(1500px, 1fr));
		grid-auto-rows: minmax(200px, auto); 
		max-height: 100vh;
		overflow-y: auto;
		gap: 20px;
		margin-top: 100px;
	}


	.support-items {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: wrap;
		height: 90vh;
		overflow-y: auto;
		width: 100%;
	}


	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.item-card {
		border: 1px solid #ccc;
		width: 100%; 
		padding: 15px;
		margin: 10px 0;
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
  