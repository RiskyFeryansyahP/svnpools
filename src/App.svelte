<script lang="ts">
	//imporint
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import Tabs from './shared/Tabs.svelte'
	import PoolForm from './components/CreatePoolForm.svelte'

	// tabs
	let items = ['Current Pools', 'Add New Pools']
	let activeItem = 'Current Pools'

	const tabChange = (e: CustomEvent) => {
		activeItem = e.detail
	}
</script>

<Header />
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange} />
	{#if activeItem === 'Current Pools'}
		<p> Pool list component goes here </p>	
	{:else if activeItem === 'Add New Pools'}
		<PoolForm />
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>