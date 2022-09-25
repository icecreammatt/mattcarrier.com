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
		background-color: rgba(228, 228, 228, 1);
		padding: 2rem;
		max-width: 46rem;
	}
	@media only screen and (max-width: 50rem) {
		article {
			padding: 2rem;
			max-width: 26rem;
		}
	}
</style>
