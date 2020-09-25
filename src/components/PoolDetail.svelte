<script lang="ts">
    // importing
    import { createEventDispatcher } from 'svelte'
    import { poolStore } from '../store/store'
    import { tweened } from 'svelte/motion'
    import Card from '../shared/Card.svelte'
    import Button from '../shared/Button.svelte'

    // import type
    import type { Pool } from '../shared/types/pool'
    
    export let pool: Pool;

    const dispatch = createEventDispatcher()

    //reactive value
    $: totalValues = pool.votesA + pool.votesB
    $: percentA = 100 / totalValues * pool.votesA || 0
    $: percentB = 100 / totalValues * pool.votesB || 0

    // tweened percentages
    const tweenedA = tweened(0)
    const tweenedB = tweened(0)

    $: tweenedA.set(percentA)
    $: tweenedB.set(percentB)

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

    const handleDeletePool = (id: number) => {
        poolStore.update(currentPools => {
            let newPools = currentPools.filter(pool => pool.id !== id)

            return newPools
        })
    }
</script>

<Card>
    <div class="pool">
        <h3> {pool.question} </h3>
        <p> Total Votes: { totalValues } </p>
        <div class="answer" on:click={() => handleVote('a', pool.id)}>
            <div class="percent percent-a" style="width: {$tweenedA}%"></div>
            <span> {pool.answerA} ({ pool.votesA })</span>
        </div>
        <div class="answer" on:click={() => handleVote('b', pool.id)}>
            <div class="percent percent-b" style="width: {$tweenedB}%"></div>
            <span> {pool.answerB} ({ pool.votesB })</span>
        </div>
        <div class="delete">
            <Button flat={true} inverse={true} on:click={() => handleDeletePool(pool.id)} >Delete</Button>
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
        border-left: 4px solid rgba(217, 27, 66, 0.2);
    }

    .percent-b {
        background: rgba(60, 196, 160, 0.2);
        border-left: 4px solid rgba(60, 196, 160, 0.2);
    }

    .delete {
        margin-top: 30px;
        text-align: center;
        cursor: pointer;
    }
</style>