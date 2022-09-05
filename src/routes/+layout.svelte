<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '../stories/Footer.svelte';
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
		padding-bottom: 2rem;
		padding-top: 2rem;
	}
</style>
