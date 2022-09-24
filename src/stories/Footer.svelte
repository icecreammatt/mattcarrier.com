<script>
import Button from './Button.svelte';

</script>

<footer>
	<nav>
		<ul>
            <li><span>Copyright 2022</li>
            <li><Button label="Github" url="https://www.github.com/icecreammatt/" /></li>
            <li><Button label="Linkedin" url="https://www.linkedin.com/in/carriermatt/" /></li>
            <li><Button label="Stack Overflow" url="https://stackoverflow.com/users/873559/matt-carrier" /></li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		align-self: flex-end;
		background: #c8c8c8;
		display: flex;
        background-color: green;
	}

	nav {
		align-items: center;
		align-self: flex-end;
		background-color: red;
		display: flex;
        justify-content: center;
	}

	ul {
		display: flex;
		justify-content: space-around;
		list-style-type: none;
	}

    /* li { */
    /*     align-items: flex-end; */
    /*     justify-content: center; */
    /* } */

    li:first-child {
		padding-left: 1.0rem;
		padding-right: 1.0rem;
        display: flex;
        padding: 0.5rem;
    }

</style>
