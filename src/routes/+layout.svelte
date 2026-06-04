<script lang="ts">
	import '../app.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/600.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children }: { children: any } = $props();

	// The landing page has its own terminal masthead, so the banner is redundant there.
	let showHeader = $derived(page.route.id !== '/');
</script>

<svelte:head>
	<title>Quite Frankly</title>
</svelte:head>

<div class="app">
	{#if showHeader}
		<Header />
	{/if}

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
	}
</style>
