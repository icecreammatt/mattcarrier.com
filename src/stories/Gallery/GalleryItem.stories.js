import GalleryItem from './GalleryItem.svelte';

export default {
	title: 'Gallery/GalleryItem',
	component: GalleryItem,
	argTypes: {
		expanded: Boolean,
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
	expanded: false
};
