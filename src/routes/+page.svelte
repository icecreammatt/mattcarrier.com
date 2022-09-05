<script>
	import Gallery from '../stories/Gallery/Gallery.svelte';
	export let data;
	const { featured } = data;
</script>

<h1>Matt Carrier</h1>
<p>Blurb about me</p>
<Gallery count={10} content={featured} />
