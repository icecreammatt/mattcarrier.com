<script>
	import Button from './Button.svelte';

	// background: #c8c8c8;
	// background-repeat: no-repeat;
	// border-bottom: 1px solid #c8c8c8;
</script>

<header>
	<Button label="Home" url="/" color="#000" background="rgba(255,255,255, 0.5)" />
	<nav>
		<ul>
			<li><Button label="Blog" url="/post" color="#000" background="rgba(255,255,255, 0.5)" /></li>
			<li>
				<Button label="Resume" url="/resume" color="#000" background="rgba(255,255,255, 0.5)" />
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background-image: url('../../images/banner.jpeg');
		box-shadow: 0px -30px 20px -10px rgba(223, 190, 159, 1) inset;
		min-height: 230px;
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
