import { getPosts, getFeatured, groupByYear } from '$lib/posts';

export const prerender = true;

/** Logbook entries from this year onward stay expanded; older years fold away. */
const CUTOFF_YEAR = 2017;

export async function load() {
	const posts = await getPosts();
	const featured = getFeatured(posts);

	// The logbook is the complete timeline — featured posts also appear here.
	const groups = groupByYear(posts);

	const recentGroups = groups.filter((g) => g.year >= CUTOFF_YEAR);
	const olderGroups = groups.filter((g) => g.year < CUTOFF_YEAR);
	const olderCount = olderGroups.reduce((n, g) => n + g.posts.length, 0);

	return { featured, recentGroups, olderGroups, olderCount };
}
