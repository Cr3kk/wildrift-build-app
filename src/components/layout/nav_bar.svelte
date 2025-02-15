<script>
	const LINKS = [
		{ name: 'Home', link: '/' },
		{ name: 'Items', link: '/items' },
		{ name: 'Champions', link: '/champions' }
	];
</script>

<main>
	<nav>
		{#each LINKS as { name, link }}
			{@render links(name, link)}
		{/each}
	</nav>
</main>

{#snippet links(name, link)}
	<a href={link}>{name}</a>
{/snippet}

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 200px;
		border: 1px solid black;
	}

	a {
		text-decoration: none;
		margin: 10px;
	}
</style>
