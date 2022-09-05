import Gallery from './Gallery.svelte';

export default {
	title: 'Gallery/Gallery',
	component: Gallery,
	argTypes: {
		count: 12,
		color: 'red'
	}
};

const Template = (args) => ({
	Component: Gallery,
	props: args
});

export const Primary = Template.bind({});
Primary.args = {
	count: 30,
	color: 'red'
};

export const Secondary = Template.bind({});
Secondary.args = {
	count: 2,
	color: 'red'
};
