export const load = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const allPosts = await response.json();

	// Filter out resume post but keep it so links don't break
	const posts = allPosts.filter((post) => post.path !== '/post/resume');

	return {
		posts
	};
};
