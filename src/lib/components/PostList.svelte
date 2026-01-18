<script lang="ts">
	import { formatDate, type PostMetadata } from '$lib/posts';

	interface Props {
		posts: PostMetadata[];
	}
	let { posts }: Props = $props();
</script>

<aside class="post-list">
	<div class="blurb">
		<p>
			My name is Frank Oppervoll-Larsen, I'm a married father of two. I work as a software
			developer, and write some software on my little spare time too. When bored, I'm usually
			playing Minecraft.
		</p>
	</div>

	<nav>
		<h3>Posts</h3>
		<ul>
			{#each posts as post}
				<li>
					<a href="/posts/{post.slug}">
						<span class="date">{formatDate(post.date)}</span>
						<span class="title">{post.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	.post-list {
		background-color: var(--color-bg-card);
		border-radius: 12px;
		padding: 1.5rem;
		height: fit-content;
        max-width: 30vw;
	}

	.blurb {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.blurb p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: 1rem;
		color: var(--color-accent);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin-bottom: 0.5rem;
	}

	a {
		display: flex;
		flex-direction: column;
		padding: 0.75rem;
		border-radius: 8px;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	a:hover {
		background-color: var(--color-bg-elevated);
		text-decoration: none;
	}

	.date {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-bottom: 0.25rem;
	}

	.title {
		color: var(--color-text);
		font-size: 0.9rem;
		line-height: 1.3;
	}

	a:hover .title {
		color: var(--color-accent);
	}
</style>
