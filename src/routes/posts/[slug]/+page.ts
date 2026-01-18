import { getPost, getPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export async function load({ params }: Parameters<PageLoad>[0]) {
	const post = await getPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return { post };
}

export async function entries() {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
