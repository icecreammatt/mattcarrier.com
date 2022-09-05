import { fetchFeaturedMarkdownPosts } from "$lib/utils";
import { json } from '@sveltejs/kit'

export const GET = async () => {
    const allPosts = await fetchFeaturedMarkdownPosts();

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date) - new Date(a.meta.date);
    });

    return json(sortedPosts);
}