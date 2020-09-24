<script lang="ts">
    // importing
    import PoolDetail from "./PoolDetail.svelte"
    import type { PoolType } from "../shared/types/pool";

    export let pools: PoolType = []
</script>

<div class="pool-list">
    {#each pools as pool}
        <div> <PoolDetail pool={pool} on:vote /> </div>
    {/each}
</div>

<style>
    .pool-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
</style>