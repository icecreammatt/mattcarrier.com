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
