import { fetchFeaturedMarkdownPosts } from '$lib/utils';

export async function load({ params }) {
    // const post = await import(`../${params.slug}.md`)
    // const { title, date } = post.metadata
    // const Content = post.default

    const featured = await fetchFeaturedMarkdownPosts();

    return {
        featured
    }
}