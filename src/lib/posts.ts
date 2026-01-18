export interface Post {
	slug: string;
	title: string;
	date: string;
	categories: string;
	content: typeof import('*.md').default;
}

export interface PostMetadata {
	slug: string;
	title: string;
	date: string;
	categories: string;
}

export async function getPosts(): Promise<PostMetadata[]> {
	const posts: PostMetadata[] = [];

	const modules = import.meta.glob('/content/posts/*.md', { eager: true });

	for (const path in modules) {
		const module = modules[path] as { metadata: { title: string; date: string; categories: string } };
		const filename = path.split('/').pop()!;
		// Extract slug from filename (e.g., "2020-02-15-Parsec.md" -> "parsec")
		const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '').toLowerCase();

		posts.push({
			slug,
			title: module.metadata.title,
			date: module.metadata.date,
			categories: module.metadata.categories
		});
	}

	// Sort by date descending (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
	const modules = import.meta.glob('/content/posts/*.md');

	for (const path in modules) {
		const filename = path.split('/').pop()!;
		const postSlug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '').toLowerCase();

		if (postSlug === slug) {
			const module = (await modules[path]()) as {
				default: typeof import('*.md').default;
				metadata: { title: string; date: string; categories: string };
			};

			return {
				slug,
				title: module.metadata.title,
				date: module.metadata.date,
				categories: module.metadata.categories,
				content: module.default
			};
		}
	}

	return null;
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
