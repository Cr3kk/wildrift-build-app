<script>
    import Link from './link.svelte'

    const LINKS = [
        { name: 'Home', link: '/' },
        { name: 'Items', link: '/items' },
        { name: 'Champions', link: '/champions' }
    ]
</script>

<main>
    <nav>
        {#each LINKS as { name, link }}
            <Link { link } { name } />
        {/each}
    </nav>
</main>

<style>
    nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>

