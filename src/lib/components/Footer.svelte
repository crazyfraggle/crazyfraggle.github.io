<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<p>All content &copy; {currentYear} Frank Oppervoll-Larsen</p>
</footer>

<style>
	footer {
		padding: 1.5rem 2rem;
		background-color: var(--color-bg-elevated);
		border-top: 1px solid var(--color-border);
		text-align: center;
	}

	p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: 0.9rem;
	}
</style>
