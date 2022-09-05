import Gallery from './Gallery.svelte';

export default {
	title: 'Gallery/Gallery',
	component: Gallery,
	argTypes: {
		columns: 2,
		width: 100,
		content: []
	}
};

const Template = (args) => ({
	Component: Gallery,
	props: args
});

export const Primary = Template.bind({});
Primary.args = {
	columns: 5,
	width: 100,
	content: [...Array(30)].map(() => {
		return { meta: { expanded: false, title: 'title', description: 'desc', image: '' } };
	})
};

export const Secondary = Template.bind({});
Secondary.args = {
	columns: 5,
	width: 100,
	content: [...Array(5)].map(() => {
		return { meta: { expanded: false, title: 'title', description: 'desc', image: '' } };
	})
};
