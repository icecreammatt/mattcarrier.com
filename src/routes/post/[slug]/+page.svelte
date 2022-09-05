<script>
	export let data;
	const { title, date, Content } = data;
</script>

<article>
	<h1>{title}</h1>
	<p>Published: {date}</p>
	<Content />
</article>

<style>
	article {
		background-color: rgba(228, 228, 228, 0.912);
		margin: 1rem;
		padding: 1rem;
	}
	Content {
		border: 5px solid green;
	}
</style>
