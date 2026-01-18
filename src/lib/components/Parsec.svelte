<script lang="ts">
	interface Props {
		file: string;
	}
	let { file }: Props = $props();
</script>

<div class="parsec-container">
	<iframe
		src={file}
		width="640"
		height="480"
		allowfullscreen
		title="Parsec game embed"
	></iframe>
</div>

<style>
	.parsec-container {
		position: relative;
		width: 100%;
		max-width: 640px;
		margin: 1.5rem auto;
		aspect-ratio: 4 / 3;
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 1px solid var(--color-border);
		border-radius: 8px;
	}
</style>
