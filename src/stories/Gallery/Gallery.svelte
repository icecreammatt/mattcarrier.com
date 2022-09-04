<script>
	import GalleryItem from './GalleryItem.svelte';

	const projects = Array(10);
</script>

<ul>
	{#each projects as project}
		<li>
			<GalleryItem />
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
	}
	li {
		display: flex;
		padding: 0.2rem;
	}
</style>
