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
	featured: boolean;
	blurb?: string;
	tags?: string[];
}

export interface YearGroup {
	year: number;
	posts: PostMetadata[];
	/** Annotation for the gap between this group and the next-older one, if > 1 year. */
	gapAfter?: { older: number; newer: number; years: number; note: string };
}

export async function getPosts(): Promise<PostMetadata[]> {
	const posts: PostMetadata[] = [];

	const modules = import.meta.glob('/content/posts/*.md', { eager: true });

	for (const path in modules) {
		const module = modules[path] as {
			metadata: {
				title: string;
				date: string;
				categories: string;
				featured?: boolean;
				blurb?: string;
				tags?: string[];
			};
		};
		const filename = path.split('/').pop()!;
		// Extract slug from filename (e.g., "2020-02-15-Parsec.md" -> "parsec")
		const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '').toLowerCase();

		posts.push({
			slug,
			title: module.metadata.title,
			date: module.metadata.date,
			categories: module.metadata.categories,
			featured: module.metadata.featured ?? false,
			blurb: module.metadata.blurb,
			tags: module.metadata.tags
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

/** Short "MMM DD" form for the logbook timeline. */
export function formatDayMonth(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit'
	});
}

/** Hand-picked posts (frontmatter `featured: true`), newest first, capped at 3. */
export function getFeatured(posts: PostMetadata[]): PostMetadata[] {
	return posts.filter((p) => p.featured).slice(0, 3);
}

/**
 * Group posts by year (descending). Each group is annotated with the gap to the
 * next-older group when consecutive years differ by more than one.
 */
export function groupByYear(posts: PostMetadata[]): YearGroup[] {
	const byYear = new Map<number, PostMetadata[]>();
	for (const post of posts) {
		const year = new Date(post.date).getFullYear();
		if (!byYear.has(year)) byYear.set(year, []);
		byYear.get(year)!.push(post);
	}

	const groups: YearGroup[] = [...byYear.entries()]
		.map(([year, posts]) => ({ year, posts }))
		.sort((a, b) => b.year - a.year);

	for (let i = 0; i < groups.length - 1; i++) {
		const years = groups[i].year - groups[i + 1].year;
		if (years > 1) {
			groups[i].gapAfter = {
				older: groups[i + 1].year,
				newer: groups[i].year,
				years,
				note: years >= 5 ? 'touched grass, allegedly' : 'the quiet years'
			};
		}
	}

	return groups;
}
