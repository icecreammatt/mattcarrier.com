<script>
	import Gallery from '../stories/Gallery/Gallery.svelte';
	export let data;
	let columns = 3;
	let width = 150;
	const { featured } = data;
</script>

<article>
	<h1>Matt Carrier</h1>
	<p>Blurb about me</p>
	<Gallery content={featured} {columns} {width} />
</article>

<style>
</style>
