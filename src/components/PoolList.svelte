<script lang="ts">
    // importing
    import { poolStore } from '../store/store'
    import { fade, scale } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import PoolDetail from "./PoolDetail.svelte"

    // let pools: PoolType = []

    // poolStore.subscribe(data => {
    //     pools = data
    // })

    // onMount(() => {
    //     // lifecycle onmount when component is mounted
    // })

    // onDestroy(() => {
    //     // lifecycle destroy when component is destroyed
           // for unsub store
    // })
</script>

<div class="pool-list">
    {#each $poolStore as pool (pool.id)}
        <div in:fade out:scale|local animate:flip={{duration: 500}}> 
            <PoolDetail pool={pool} /> 
        </div>
    {/each}
</div>

<style>
    .pool-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
</style>