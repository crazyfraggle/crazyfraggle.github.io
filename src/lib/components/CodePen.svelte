<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		user: string;
		slug: string;
		title: string;
		height?: number;
	}
	let { user, slug, title, height = 360 }: Props = $props();

	onMount(() => {
		// Load CodePen embed script
		const script = document.createElement('script');
		script.src = 'https://static.codepen.io/assets/embed/ei.js';
		script.async = true;
		document.body.appendChild(script);
		return () => script.remove();
	});
</script>

<p
	class="codepen"
	data-height={height}
	data-theme-id="dark"
	data-default-tab="js,result"
	data-user={user}
	data-slug-hash={slug}
	style="height: {height}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
	data-pen-title={title}
>
	<span>See the Pen <a href="https://codepen.io/{user}/pen/{slug}">
	{title}</a> by {user} (<a href="https://codepen.io/{user}">@{user}</a>)
	on <a href="https://codepen.io">CodePen</a>.</span>
</p>
