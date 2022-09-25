<script>
	export let data;

	//Published {post.meta.date}
</script>

<article>
	<h1>Posts</h1>
	<ul>
		{#each data.posts as post}
			<li>
				<h2>
					<a href={post.path}>
						{post.meta.title}
					</a>
				</h2>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding: 2rem;
		max-width: 46rem;
	}
	@media only screen and (max-width: 50rem) {
		article {
			padding: 2rem;
			max-width: 30rem;
		}
	}
</style>
