<script lang="ts">
	//imporint
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import PoolList from './components/PoolList.svelte'
	import Tabs from './shared/Tabs.svelte'
	import PoolForm from './components/CreatePoolForm.svelte'

	import type { PoolType } from './shared/types/pool'

	// tabs
	let items = ['Current Pools', 'Add New Pools']
	let activeItem = 'Current Pools'

	let pools: PoolType = [
		{
			id: 1,
			question: 'Golang or NodeJS',
			answerA: 'Golang',
			answerB: 'NodeJS',
			votesA: 9,
			votesB: 15,
		}
	]

	const tabChange = (e: CustomEvent) => {
		activeItem = e.detail
	}

	const handleNewPool = (e: CustomEvent) => {
		const pool = e.detail

		pools = [...pools, pool]

		activeItem = 'Current Pools'

		console.log(pools)
	}

	const handleVote = (e: CustomEvent) => {
		const {id, option} = e.detail

		let newPools = [...pools]
		let upVotedPool = pools.find(pool => pool.id === id )

		if (option === 'a') {
			upVotedPool.votesA++
		} else if (option === 'b') {
			upVotedPool.votesB++
		}

		pools = newPools
	}
</script>

<Header />
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange} />
	{#if activeItem === 'Current Pools'}
		<PoolList pools={pools} on:vote={handleVote} />
	{:else if activeItem === 'Add New Pools'}
		<PoolForm on:addNewPool={handleNewPool} />
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>