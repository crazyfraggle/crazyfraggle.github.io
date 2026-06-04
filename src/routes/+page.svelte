<script lang="ts">
	import { formatDayMonth, type YearGroup } from '$lib/posts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let expanded = $state(false);
</script>

<svelte:head>
	<title>Quite Frankly — Frank's Blog</title>
</svelte:head>

{#snippet yearGroup(group: YearGroup)}
	<div class="year">
		<h3 class="year-label">{group.year}</h3>
		<ul class="entries">
			{#each group.posts as post}
				<li class="entry">
					<span class="bullet" aria-hidden="true">●</span>
					<span class="entry-date">{formatDayMonth(post.date)}</span>
					<a href="/posts/{post.slug}">{post.title}</a>
				</li>
			{/each}
		</ul>
		{#if group.gapAfter}
			<p class="gap">
				<span aria-hidden="true"># </span>{group.gapAfter.older} → {group.gapAfter.newer}
				· {group.gapAfter.note}
			</p>
		{/if}
	</div>
{/snippet}

<div class="landing">
	<!-- Zone 1: terminal header / about -->
	<section class="terminal" aria-label="About">
		<div class="titlebar">
			<span class="lights" aria-hidden="true">
				<span class="light"></span><span class="light"></span><span class="light"></span>
			</span>
			<span class="titlebar-label" aria-hidden="true">frank@crazyfraggle: ~</span>
		</div>
		<div class="screen">
			<p class="line">
				<span class="prompt" aria-hidden="true">frank@crazyfraggle:~$</span>
				<span class="cmd">whoami</span>
			</p>
			<h1 class="title">Quite Frankly</h1>
			<p class="subtitle">
				A blog by Frank Oppervoll-Larsen — software developer, married father of two,
				occasional Minecraft hermit.
			</p>
			<p class="line">
				<span class="prompt" aria-hidden="true">frank@crazyfraggle:~$</span>
				<span class="cmd">cat about.txt</span>
			</p>
			<p class="output">
				This is my second attempt at keeping a little blog. I write about whatever seems worth
				sharing at the time — code, side projects, and the occasional misadventure with a wider
				blast radius than intended.
			</p>
			<p class="line">
				<span class="prompt" aria-hidden="true">frank@crazyfraggle:~$</span>
				<span class="cursor" aria-hidden="true"></span>
			</p>
		</div>
	</section>

	<!-- Zone 2: featured dispatches -->
	{#if data.featured.length}
		<section aria-labelledby="featured-head">
			<h2 class="section-head" id="featured-head">Featured Dispatches</h2>
			<div class="featured-grid">
				{#each data.featured as post}
					<a class="card" href="/posts/{post.slug}">
						<span class="rivet tl" aria-hidden="true"></span>
						<span class="rivet tr" aria-hidden="true"></span>
						<span class="rivet bl" aria-hidden="true"></span>
						<span class="rivet br" aria-hidden="true"></span>
						<span class="card-date">{formatDayMonth(post.date)}, {new Date(post.date).getFullYear()}</span>
						<h3 class="card-title">{post.title}</h3>
						{#if post.blurb}<p class="card-blurb">{post.blurb}</p>{/if}
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Zone 3: the logbook -->
	<section aria-labelledby="logbook-head">
		<div class="section-head-row">
			<h2 class="section-head" id="logbook-head">The Logbook</h2>
			<code class="log-cmd" aria-hidden="true">$ git log --oneline --all</code>
		</div>

		<div class="logbook">
			{#each data.recentGroups as group}
				{@render yearGroup(group)}
			{/each}

			{#if data.olderGroups.length}
				<button
					class="fold-toggle"
					aria-expanded={expanded}
					onclick={() => (expanded = !expanded)}
				>
					<span aria-hidden="true">{expanded ? '−' : '+'}</span>
					{expanded ? 'fewer entries' : `${data.olderCount} earlier entries`}
				</button>

				{#if expanded}
					{#each data.olderGroups as group}
						{@render yearGroup(group)}
					{/each}
				{/if}
			{/if}
		</div>
	</section>
</div>

<style>
	.landing {
		max-width: 1080px;
		margin: 0 auto;
		padding: 2.5rem 2rem 4rem;
		font-family: var(--font-mono);
	}

	/* ---------- Zone 1: terminal ---------- */
	.terminal {
		border: 1px solid var(--brass-border2);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(0, 0, 0, 0.3);
	}

	.titlebar {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.6rem 0.9rem;
		background: var(--panel);
		border-bottom: 1px solid var(--brass-border2);
	}

	.lights {
		display: inline-flex;
		gap: 0.45rem;
	}

	.light {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--brass-border);
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.25);
	}
	.light:nth-child(1) { background: var(--copper); }
	.light:nth-child(2) { background: var(--brass-dim); }
	.light:nth-child(3) { background: var(--olive); }

	.titlebar-label {
		color: var(--text-dim);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
	}

	.screen {
		padding: 1.8rem 1.8rem 1.6rem;
		background:
			radial-gradient(120% 80% at 50% 0%, rgba(212, 175, 55, 0.05), transparent 60%),
			var(--bg);
		font-size: 0.95rem;
		line-height: 1.7;
	}

	.line {
		margin: 0;
	}

	.prompt {
		color: var(--brass-dim);
		user-select: none;
		margin-right: 0.5ch;
	}

	.cmd {
		color: var(--text);
	}

	.title {
		font-family: var(--font-serif);
		font-size: clamp(2.4rem, 7vw, 3.4rem);
		font-weight: bold;
		color: var(--brass);
		letter-spacing: 0.01em;
		margin: 0.4rem 0 0.2rem;
		line-height: 1.05;
		/* faux-engraved: dark drop below, warm highlight above */
		text-shadow: 0 1px 0 #3a2418, 0 -1px 0 #f5e6c0;
	}

	.subtitle {
		color: var(--text-muted);
		margin: 0 0 1.2rem;
		max-width: 60ch;
	}

	.output {
		color: var(--text-muted);
		margin: 0.1rem 0 1.2rem;
		max-width: 70ch;
	}

	.cursor {
		display: inline-block;
		width: 8px;
		height: 15px;
		background: var(--brass);
		margin-left: 2px;
		vertical-align: -2px;
		animation: blink 1.1s step-end infinite;
	}

	@keyframes blink {
		0%, 49% { opacity: 1; }
		50%, 100% { opacity: 0; }
	}

	/* ---------- Section dividers ---------- */
	.section-head {
		font-family: var(--font-serif);
		color: var(--brass);
		font-size: 1.4rem;
		font-weight: bold;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin: 0 0 1.2rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid var(--brass-border);
		text-shadow: 0 1px 0 #3a2418;
	}

	.section-head-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.section-head-row .section-head {
		flex: 1;
		min-width: 12ch;
	}

	.log-cmd {
		color: var(--comment);
		font-size: 0.8rem;
		background: none;
		padding: 0;
		white-space: nowrap;
	}

	section {
		margin-top: 3rem;
	}

	/* ---------- Zone 2: featured cards ---------- */
	.featured-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.2rem;
	}

	.card {
		position: relative;
		display: block;
		background: var(--card);
		border: 1px solid var(--brass-border);
		border-radius: 6px;
		padding: 1.5rem 1.6rem;
		text-decoration: none;
		transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		border-color: var(--brass-border2);
		transform: translateY(-3px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
		text-decoration: none;
	}

	.rivet {
		position: absolute;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--brass-border2);
		box-shadow: inset 0 0.5px 0.5px rgba(255, 235, 190, 0.4);
	}
	.rivet.tl { top: 7px; left: 7px; }
	.rivet.tr { top: 7px; right: 7px; }
	.rivet.bl { bottom: 7px; left: 7px; }
	.rivet.br { bottom: 7px; right: 7px; }

	.card-date {
		display: block;
		color: var(--copper);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.card-title {
		font-family: var(--font-serif);
		color: var(--text);
		font-size: 1.25rem;
		font-weight: bold;
		line-height: 1.25;
		margin: 0 0 0.6rem;
		transition: color 0.2s ease;
	}

	.card:hover .card-title {
		color: var(--brass);
	}

	.card-blurb {
		color: var(--text-dim);
		font-size: 0.88rem;
		line-height: 1.55;
		margin: 0;
	}

	/* ---------- Zone 3: logbook ---------- */
	.logbook {
		font-size: 0.92rem;
	}

	.year {
		margin-bottom: 1.4rem;
	}

	.year-label {
		font-family: var(--font-serif);
		color: var(--copper);
		font-size: 0.95rem;
		font-weight: bold;
		letter-spacing: 0.18em;
		margin: 0 0 0.5rem;
	}

	.entries {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.entry {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		padding: 0.2rem 0;
		line-height: 1.5;
	}

	.bullet {
		color: var(--olive);
		font-size: 0.6rem;
		flex: none;
		line-height: 1.6;
	}

	.entry-date {
		color: var(--text-dim);
		flex: none;
		width: 6ch;
		font-variant-numeric: tabular-nums;
	}

	.entry a {
		color: var(--text);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: color 0.15s ease, border-color 0.15s ease;
	}

	.entry a:hover {
		color: var(--brass);
		border-bottom-color: var(--brass-border);
		text-decoration: none;
	}

	.gap {
		color: var(--comment);
		font-style: italic;
		font-size: 0.85rem;
		margin: 0.7rem 0 0.2rem;
		padding-left: calc(6ch + 1.4rem);
	}

	.fold-toggle {
		display: inline-block;
		margin: 0.4rem 0 1.2rem;
		padding: 0.2rem 0;
		background: none;
		border: none;
		color: var(--copper);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		cursor: pointer;
		transition: color 0.15s ease;
	}

	.fold-toggle:hover {
		color: var(--brass);
		text-decoration: underline;
	}

	/* ---------- Responsive ---------- */
	@media (max-width: 700px) {
		.landing {
			padding: 1.5rem 1.1rem 3rem;
		}

		.featured-grid {
			grid-template-columns: 1fr;
		}

		.screen {
			padding: 1.3rem 1.2rem;
		}

		.log-cmd {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
		}
	}
</style>
