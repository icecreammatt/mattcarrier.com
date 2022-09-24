<script>
	import Header from '$stories/Header.svelte';
	import Footer from '$stories/Footer.svelte';
	import '$lib/styles/style.css';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		display: flex;
		min-width: 450px;
		align-content: center;
		justify-content: center;
	}
	/* Footer { */
	/*     display: flex; */
	/*     align-content: end; */
	/*     justify-content: end; */
	/*     flex-direction: row; */
	/* } */
</style>
