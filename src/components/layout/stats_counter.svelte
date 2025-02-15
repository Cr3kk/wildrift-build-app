<script>
    let { stats, passives, gold } = $props();
</script>

<main>
    <h2>Cost</h2>
    <p>{$gold} gold.</p>
    <h2>Stats</h2>
    <ul>
        {#each Object.entries($stats) as [key, value]}
            <li>{key}: {value}</li>
        {/each}
    </ul>
    <h2>Passives</h2>
    <ul>
        {#each $passives as passive}
            <li>{passive}</li>
        {/each}
    </ul>
</main>

<style>
    h2 {
        text-align: center;
    }
    p {
        text-align: center;
    }
</style>