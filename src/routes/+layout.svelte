<script>
	import Header from '$stories/Header.svelte';
	import Footer from '$stories/Footer.svelte';
	import '$lib/styles/style.css';
</script>

<html lang="en">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</html>

<style>
	main {
		outline: 1px solid red;
		display: flex;
		max-width: 1999px;
		align-content: center;
		justify-content: center;
		background-color: #dfbe9f;
	}

	@media only screen and (max-width: 50rem) {
		main {
			outline: 1px solid green;
			display: block;
			max-width: 50rem;
			align-content: left;
			align-items: left;
			justify-content: left;

			/* align-content: left; */
			/* justify-content: left; */
			background-color: #dfbe9f;
		}
	}
</style>
