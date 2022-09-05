<script>
	import { createEventDispatcher } from 'svelte';
	export let expanded = false;
	export let index = 0;
	export let title = 'title';
	export let description = 'description';
	export let image = '';

	function onClick() {
		expanded = !expanded;

		dispatch('toggle', {
			expanded,
			index,
			title,
			image,
			description
		});
		return;
	}

	const dispatch = createEventDispatcher();
</script>

<div on:click={onClick} class={expanded ? 'item expanded' : 'item collapsed'}>
	<img alt=" " width="100px" height="100px" src={image} />
	{#if image === ''}
		<span>{index + 1}: {title}</span>
	{/if}
</div>

<style>
	div {
		display: block;
		width: 100px;
		height: 100px;
	}
	div.item {
		display: block;
		cursor: default;
		background-color: rgb(173, 173, 173);
		outline: 1px solid black;
	}

	div.item.collapsed {
		width: 100px;
		height: 100px;
		transition: width 0.1s ease-in-out;
	}

	div.item.expanded {
		height: 100px;
		transition: width 0.1s ease-in-out;
	}
	span {
		display: block;
	}
</style>
