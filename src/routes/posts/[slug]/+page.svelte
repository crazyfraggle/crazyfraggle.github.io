<script lang="ts">
	import { formatDate } from '$lib/posts';
	import Figure from '$lib/components/Figure.svelte';
	import Parsec from '$lib/components/Parsec.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} - Quite Frankly</title>
</svelte:head>

<article class="post">
	<header>
		<h1>{data.post.title}</h1>
		<time datetime={data.post.date}>{formatDate(data.post.date)}</time>
	</header>

	<div class="content">
		<data.post.content />
	</div>
</article>

<style>
	.post {
		background-color: var(--color-bg-card);
		border-radius: 12px;
		padding: 2rem;
	}

	header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	h1 {
		color: var(--color-accent);
		margin-bottom: 0.5rem;
		font-size: 2rem;
	}

	time {
		color: var(--color-text-muted);
		font-size: 0.9rem;
	}

	.content {
		line-height: 1.8;
	}

	.content :global(h2) {
		margin-top: 2rem;
	}

	.content :global(h3) {
		margin-top: 1.5rem;
	}

	.content :global(p) {
		margin-bottom: 1.25rem;
	}

	.content :global(pre) {
		margin: 1.5rem 0;
	}

	.content :global(ul),
	.content :global(ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	.content :global(li) {
		margin-bottom: 0.5rem;
	}

	.content :global(a) {
		color: var(--color-accent);
	}

	.content :global(a:hover) {
		color: var(--color-accent-hover);
	}

	.content :global(blockquote) {
		margin: 1.5rem 0;
		padding: 1rem 1.5rem;
		background-color: var(--color-bg-elevated);
		border-left: 4px solid var(--color-accent);
		border-radius: 0 8px 8px 0;
	}

	.content :global(blockquote p) {
		margin: 0;
	}

	.content :global(img) {
		display: block;
		margin: 1.5rem auto;
	}
</style>
