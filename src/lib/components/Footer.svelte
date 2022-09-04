<footer>
	<h5>Copyright 2022</h5>
	<nav>
		<ul>
			<li>Github</li>
			<li>Linkedin</li>
			<li>Stackoverflow</li>
			<li>Twitter</li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		/* padding: 1rem; */
		background: lightskyblue;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
	}

	nav {
		align-items: center;
	}

	ul {
		margin: 0;
		list-style-type: none;
		list-style: disc;
		display: flex;
		gap: 1rem;
		background-color: green;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		background-color: red;
	}
</style>
