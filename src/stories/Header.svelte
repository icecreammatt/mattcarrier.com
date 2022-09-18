<header>
	<a href="/">Home</a>

	<nav>
		<ul>
			<li>
				<a href="/post">Blog</a>
			</li>
			<li>
				<a href="/post/resume">Resume</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		padding: 1rem;
		background: lightskyblue;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	ul {
		margin: 0;
		list-style-type: none;
		display: flex;
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		padding: 0.5rem;
	}

	a:hover {
		background-color: red;
	}
</style>
