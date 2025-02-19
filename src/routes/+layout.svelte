<script>
	import { onMount, tick } from 'svelte';
	import NavBar from '../components/layout/nav_bar.svelte';
	import StatsCounter from '../components/layout/stats_counter.svelte';
	import { stats } from '../stores/stats';
	import { gold } from '../stores/gold';
	import { passives } from '../stores/passives';


	let { children } = $props();

	</script>

<main>
	<div id="nav-bar">
		<NavBar/>
	</div>

	<div id="content">
		{@render children()}
	</div>

	<div id="stats">
		<StatsCounter { stats } { passives } { gold }/>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
	}

	#content {
		text-align: center;
	}

	#nav-bar {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		width: 200px;
	}

	#stats {
		position: fixed;
		right: 0;
		top: 0;
		height: 100vh;
		width: 400px;
		padding: 20px;
		border: 1px solid black;
	}
</style>
