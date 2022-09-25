<script>
	export let data;
	const { title, Content } = data;
</script>

<article>
	<h1>{title}</h1>
	<Content />
</article>

<style>
	article {
		background-color: rgba(228, 228, 228, 0.912);
		margin: 1rem;
		padding: 1rem;
		max-width: 50rem;
	}
</style>
