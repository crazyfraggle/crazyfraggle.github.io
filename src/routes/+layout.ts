import { getPosts } from '$lib/posts';

export const prerender = true;

export async function load() {
	const posts = await getPosts();
	return { posts };
}
