import GalleryItem from './GalleryItem.svelte';

export default {
	title: 'Gallery/GalleryItem',
	component: GalleryItem,
	argTypes: {
		expanded: false,
		width: 100,
		onClick: { action: 'onClick' }
	}
};

const Template = (args) => ({
	Component: GalleryItem,
	props: args,
	on: {
		click: args.onClick
	}
});

export const Primary = Template.bind({});
Primary.args = {
	expanded: false,
	width: 100,
	image: 'http://localhost:5173/images/2015-08-24/05.jpg'
};
