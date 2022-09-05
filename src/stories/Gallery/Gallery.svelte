<script>
	import GalleryItem from './GalleryItem.svelte';

	export let content = [];
	export let columns = 5;

	let image = '';
	export let width = 100;

	const projects = Array();

	content.forEach(({ meta }) => {
		const { image, title } = meta;
		projects.push({ expanded: false, title, description: title, image });
	});

	let previous = -1;
	let expanded = false;

	let descriptionPosition = 0;
	let descriptionContent = '';

	const handleToggle = (state) => {
		const { detail } = state;
		const { index, expanded: expand, title, image: img, collapse } = detail;
		image = img;

		projects.forEach((item) => {
			item.toggle = false;
		});

		if (previous >= 0) {
			projects[previous].expanded = false;
		}

		// if animating this open close be sure to only do it
		// when the row changes instead of all of them otherwise
		// it looks strange when going from items in same row
		// expanded = false;

		// setTimeout(() => {
		previous = index;
		projects[index].expanded = expand;
		expanded = expand;

		descriptionContent = `${index + 1}: ${title}`;

		const rem = index % columns;
		descriptionPosition = index + columns - rem;
		// }, 410);
	};
</script>

<div style="min-width: {width * columns}px; max-width: {width * columns}px">
	<ul>
		{#each projects as { expanded, image, title, description }, index}
			<li style="order: {index + 1}">
				<GalleryItem
					{width}
					{index}
					{image}
					{title}
					{description}
					{expanded}
					on:toggle={handleToggle}
				/>
			</li>
		{/each}
		<li
			class="desc {expanded ? 'expanded' : 'collapsed'}"
			style="background-image: url('{image}'); order: {descriptionPosition}; width: {width *
				columns}px; max-width: {width * columns}px;"
		>
			<div>
				<h3>{descriptionContent}</h3>
				<!-- replace image here with CSS background image from sprite sheet -->
				<!-- <img alt=" " width="300px" max-height="100px" src={image} /> -->
			</div>
		</li>
	</ul>
</div>

<style>
	div {
		display: flex;
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
	}
	li.desc {
		overflow: hidden;
		display: flex;
		background-size: cover;
		background-repeat: no-repeat;
		color: white;
		text-shadow: 2px 2px rgba(40, 40, 40, 0.466);

		margin-top: 1px;
		margin-bottom: -1px;
		margin-left: -1px;
		margin-right: -1px;

		border-bottom: 1px solid black;
		border-left: 1px solid black;
		border-right: 1px solid black;
	}
	li.desc.expanded {
		height: 300px;
		transition: height 0.2s ease-in-out;
	}

	li.desc.collapsed {
		height: 0px;
		transition: height 0.2s ease-in-out;
		border-bottom: 0px solid black;
	}
</style>
