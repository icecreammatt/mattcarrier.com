<script>
	import Button from './Button.svelte';

	// background: #c8c8c8;
	// background-repeat: no-repeat;
	// border-bottom: 1px solid #c8c8c8;
</script>

<header>
	<nav>
		<Button
			targetBlank={false}
			label="Home"
			url="/"
			color="#000"
			background="rgba(255,255,255, 0.5)"
		/>
		<ul>
			<li>
				<Button
					targetBlank={false}
					label="Blog"
					url="/post"
					color="#000"
					background="rgba(255,255,255, 0.5)"
				/>
			</li>
			<li>
				<Button
					targetBlank={false}
					label="Resume"
					url="/resume"
					color="#000"
					background="rgba(255,255,255, 0.5)"
				/>
			</li>
		</ul>
	</nav>
</header>

<style>
	nav {
		max-width: 50rem;
		min-width: 50rem;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: space-between;
		outline: 1px solid red;
	}

	@media only screen and (max-width: 50rem) {
		nav {
			max-width: 20rem;
			min-width: 20rem;
			display: flex;
			align-items: left;
			align-content: left;
			justify-content: space-around;
			outline: 1px solid yellow;
		}
	}

	header {
		min-width: 1999px;
		max-width: 1999px;
		display: flex;
		justify-content: center;
		align-content: center;
		justify-content: space-around;
		/* flex-wrap: wrap; */
		/* justify-content: space-between; */
		background-image: url('../../images/banner.jpeg');
		box-shadow: 0px -30px 15px 20px rgba(223, 190, 159, 1) inset;
		min-height: 240px;
	}

	@media only screen and (max-width: 50rem) {
		header {
			min-width: 600px;
			max-width: 800px;
			display: flex;
			justify-content: left;
			align-content: left;
			justify-content: space-around;
			background-image: url('../../images/banner.jpeg');
			overflow: hidden;
			box-shadow: 0px -30px 15px 20px rgba(223, 190, 159, 1) inset;
			min-height: 260px;
		}
	}

	ul {
		margin: 0;
		list-style-type: none;
		display: flex;
		gap: 1rem;
	}

	a {
		display: flex;
		padding: 0.5rem;
		text-decoration: none;
		color: inherit;
	}

	/* a:hover { */
	/* background-color: red; */
	/* font-weight: bold; */
	/* } */
</style>
