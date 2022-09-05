export interface Meta {
    title: string;
    date: string;
    aliases: string;
    tags: Array<string>;
}
export interface MarkdownPosts {
    meta: Meta;
    path: string;
}
export const fetchMarkdownPosts = async (): Promise<Array<MarkdownPosts>> => {
    const allPostFiles = import.meta.glob('/src/routes/post/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            try {
                const { metadata } = await resolver();
                const postPath = path.slice(11, -3);

                return {
                    meta: metadata,
                    path: postPath
                }
            } catch (error) {
                console.error(error)
            }
        })
    )

    return allPosts.filter(post => !!post)
}