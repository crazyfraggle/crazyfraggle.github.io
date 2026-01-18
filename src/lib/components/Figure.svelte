<script lang="ts">
	interface Props {
		file: string;
		caption: string;
	}
	let { file, caption }: Props = $props();
</script>

<figure>
	<img src={file} alt={caption} />
	<figcaption>{caption}</figcaption>
</figure>

<style>
	figure {
		margin: 1.5rem 0;
		text-align: center;
	}

	img {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	figcaption {
		margin-top: 0.75rem;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		font-style: italic;
	}
</style>
