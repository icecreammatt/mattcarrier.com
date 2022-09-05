<script>
	import { createEventDispatcher } from 'svelte';
	export let width = 100;
	export let expanded = false;
	export let index = 0;
	export let title = 'title';
	export let image = '';

	function onClick() {
		expanded = !expanded;

		dispatch('toggle', {
			expanded,
			index,
			title,
			image
		});
		return;
	}

	const dispatch = createEventDispatcher();
</script>

<div
	on:click={onClick}
	class={expanded ? 'item expanded' : 'item collapsed'}
	style="width='{width}px'; height='{width}px';"
>
	<img alt=" " width="{width}px" src={image} />
	{#if image === ''}
		<span>{index + 1}: {title}</span>
	{/if}
</div>

<style>
	div {
		display: flex;
		min-width: 100px;
		min-height: 100px;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		overflow: hidden;
	}
	div.item {
		display: flex;
		cursor: default;
		background-color: rgb(150, 150, 150);
		outline: 1px solid black;
	}

	div.item.collapsed {
		min-width: 100px;
		transition: width 0.1s ease-in-out;
	}

	div.item.expanded {
		transition: width 0.1s ease-in-out;
	}
	span {
		display: block;
	}
</style>
