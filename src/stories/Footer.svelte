<script>
	import Button from './Button.svelte';
</script>

<footer>
	<nav>
		<ul>
			<li><span>Copyright 2022</span></li>
			<li><Button label="Github" url="https://www.github.com/icecreammatt/" /></li>
			<li><Button label="Linkedin" url="https://www.linkedin.com/in/carriermatt/" /></li>
			<li>
				<Button label="Stack Overflow" url="https://stackoverflow.com/users/873559/matt-carrier" />
			</li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		background: #c8c8c8;
		display: flex;
		/* background-color: green; */
	}

	nav {
		background-color: red;
		flex-grow: 1;
		/* align-items: center; */
		display: flex;
		justify-content: center;
	}

	ul {
		background-color: yellow;
		display: flex;
		flex-grow: 1;
		list-style-type: none;
		justify-content: flex-end;
		justify-content: space-around;
	}

	li {
		background-color: green;
		display: flex;
		/* flex-grow: 1; */
		justify-content: flex-end;
	}

	li:first-child {
		padding-left: 1rem;
		padding-right: 1rem;
		display: flex;
		padding: 0.5rem;
	}
</style>
