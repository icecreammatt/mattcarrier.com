<script>
	import { createEventDispatcher } from 'svelte';

	export let expanded = false;
	let opacity = '0%';

	export let index = 0;

	function onClick() {
		expanded = !expanded;

		console.log(`clicked ${index + 1}`);
		dispatch('toggle', {
			expanded: expanded,
			index: index
		});
	}

	const dispatch = createEventDispatcher();
</script>

<!-- <div class={expanded ? 'wrapper expanded' : 'wrapper collapsed'}> -->
<div on:click={onClick} class={expanded ? 'item expanded' : 'item collapsed'}>
	<img alt=" " width="100px" height="100px" src="" />
	<span>Index: {index + 1}</span>
	<p class={expanded ? 'expanded' : 'hidden'}>
		Expanded Description {expanded} with a lot of filler text
	</p>
</div>

<!-- </div> -->
<style>
	/* div.wrapper { */
	/* margin: 10px; */
	/* padding: 5px; */
	/* border: 1px solid blue; */
	/* } */
	div.item {
		/* padding: 15px; */
		/* margin: 5px; */
		display: block;
		/* width: 100px;
		height: 100px; */
		cursor: default;
		background-color: rgb(173, 173, 173);
		outline: 1px solid red;
		/* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='8' stroke-dasharray='50%2c 50%2c 50%2c 50' stroke-dashoffset='25' stroke-linecap='square'/%3e%3c/svg%3e"); */
		/* outline: 1px solid red; */
		/* margin: 10px; */
	}

	p {
		max-width: 100px;
	}

	p.hidden {
		opacity: 0;
	}

	p.expanded {
		transition: opacity 2s linear;
		opacity: 1;
	}

	div.item.collapsed {
		width: 100px;
		height: 100px;
		transition: width 0.1s ease-in-out;
	}

	div.item.expanded {
		/* width: 400px; */
		height: 100px;
		transition: width 0.1s ease-in-out;
	}
	span {
		display: block;
	}
</style>
