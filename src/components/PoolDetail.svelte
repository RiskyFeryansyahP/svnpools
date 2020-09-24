<script lang="ts">
    // importing
    import { createEventDispatcher } from 'svelte'
    import { poolStore } from '../store/store'
    import Card from '../shared/Card.svelte'

    // import type
    import type { Pool } from '../shared/types/pool'
    
    export let pool: Pool;

    const dispatch = createEventDispatcher()

    //reactive value
    $: totalValues = pool.votesA + pool.votesB
    $: percentA = 100 / totalValues * pool.votesA
    $: percentB = 100 / totalValues * pool.votesB

    const handleVote = (option: string, id: number) => {
        poolStore.update(currentPools => {
            let newPools = [...currentPools]
            let upVotedPool = currentPools.find(pool => pool.id === id )

            if (option === 'a') {
                upVotedPool.votesA++
            } else if (option === 'b') {
                upVotedPool.votesB++
            }

            return newPools
        })
    }
</script>

<Card>
    <div class="pool">
        <h3> {pool.question} </h3>
        <p> Total Votes: { totalValues } </p>
        <div class="answer" on:click={() => handleVote('a', pool.id)}>
            <div class="percent percent-a" style="width: {percentA}%"></div>
            <span> {pool.answerA} ({ pool.votesA })</span>
        </div>
        <div class="answer" on:click={() => handleVote('b', pool.id)}>
            <div class="percent percent-b" style="width: {percentB}%"></div>
            <span> {pool.answerB} ({ pool.votesB })</span>
        </div>
    </div>
</Card>

<style>
    h3 {
        margin: 0 auto;
        color: #555555;
    }

    p {
        margin-top: 6px;
        font-size: 14px;
        color: #aaaaaa;
        margin-bottom: 30px;
    }

    .answer {
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }

    .answer:hover {
        opacity: 0.6;
    }
    
    span {
        display: inline-block;
        padding: 10px 20px;
    }

    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }

    .percent-a {
        background: rgba(217, 27, 66, 0.2);
    }

    .percent-b {
        background: rgba(60, 196, 160, 0.2);
    }
</style>