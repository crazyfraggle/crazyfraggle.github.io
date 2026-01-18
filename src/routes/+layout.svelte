<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<svelte:head>
	<title>Quite Frankly</title>
</svelte:head>

<div class="app">
	<Header />

	<div class="page-content">
		<main class="content">
			{@render children()}
		</main>

		<PostList posts={data.posts} />
	</div>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.page-content {
		display: flex;
		flex: 1;
		max-width: var(--max-width);
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
		gap: 2rem;
	}

	.content {
		flex: 1;
		max-width: var(--content-width);
		min-width: 50vw;
	}

	@media (max-width: 900px) {
		.page-content {
			flex-direction: column;
			padding: 1rem;
		}

		.content {
			max-width: 100%;
		}
	}
</style>
