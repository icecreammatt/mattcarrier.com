<script>
	import GalleryItem from './GalleryItem.svelte';

	export let count;
	const projects = Array();
	for (let i = 0; i < count; i++) {
		projects.push({ expanded: false });
	}
	let previous = -1;
	let expanded = false;

	let descriptionPosition = 0;
	let descriptionContent = '';
	// let height = '0px';
	export const columns = 5;

	const handleToggle = (state) => {
		const { detail } = state;
		const { index, expanded: expand, collapse } = detail;

		projects.forEach((item) => {
			item.toggle = false;
		});

		if (previous >= 0) {
			projects[previous].expanded = false;
		}
		previous = index;
		projects[index].expanded = expand;
		expanded = expand;

		descriptionContent = `Index ${index + 1} This is the fillter`;

		const rem = index % columns;
		descriptionPosition = index + columns - rem;
	};
</script>

<div>
	<ul>
		{#each projects as project, index}
			<!-- {#if index % 4 == 0 && index != 0}<div style="width: 400px; height: 100px">Desc</div>{/if} -->
			<li style="order: {index + 1}">
				<GalleryItem {index} expanded={project.expanded} on:toggle={handleToggle} />
			</li>
		{/each}
		<li class="desc {expanded ? 'expanded' : 'collapsed'}" style="order: {descriptionPosition};">
			<div><h3>{descriptionContent}</h3></div>
		</li>
	</ul>
</div>

<style>
	div {
		display: flex;
		max-width: 500px;
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
		width: 500px;
		height: 100px;
		background-color: red;
		transition: order 3s;
	}
	li.desc.expanded {
		height: 300px;
		transition: height 0.1s ease-in-out;
	}

	li.desc.collapsed {
		height: 0px;
		transition: height 0.1s ease-in-out;
	}
</style>
