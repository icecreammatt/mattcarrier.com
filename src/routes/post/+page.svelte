<script>
	export let data;

	//Published {post.meta.date}
</script>

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
