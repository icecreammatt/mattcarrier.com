<script>
	export let label;
	export let url;
	export let targetBlank = true;
</script>

<div>
	<a href={url} target={targetBlank ? '_blank' : ''}>{label}</a>
</div>

<style>
	a {
		display: flex;
		padding: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;
		text-decoration: none;
		color: inherit;
		border-radius: 3px;
	}

	a:hover {
		background-color: #333333;
		color: #eeeeee;
	}
</style>
