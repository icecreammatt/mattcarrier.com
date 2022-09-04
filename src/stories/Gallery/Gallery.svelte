<script>
	import GalleryItem from './GalleryItem.svelte';

	export let count;
	const projects = Array(count);

	let descriptionPosition = 0;
	let height = '0px';
	export const columns = 4;

	const handleToggle = (state) => {
		const { detail } = state;
		const { index, expanded } = detail;
		height = expanded ? '100px' : '0px';
		console.log({ index });

		const rem = index % columns;
		descriptionPosition = index + columns - rem;

		console.log({ descriptionPosition });
	};
</script>

<div>
	<ul>
		{#each projects as project, index}
			<!-- {#if index % 4 == 0 && index != 0}<div style="width: 400px; height: 100px">Desc</div>{/if} -->
			<li style="order: {index + 1}">
				<GalleryItem {index} on:toggle={handleToggle} />
			</li>
		{/each}
		<li class="desc" style="order: {descriptionPosition}; height: {height}">
			<div>DESCRIPTION</div>
		</li>
	</ul>
</div>

<style>
	div {
		display: flex;
		max-width: 400px;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0px;
		padding: 0px;
	}
	li {
		display: flex;
		margin: 0px;
		padding: 0px;
		/* padding: 0.2rem; */
	}
	li.desc {
		display: flex;
		/* order: 4; */
		outline: 1px solid red;
		width: 400px;
		height: 100px;
		background-color: red;
	}
</style>
