import GalleryItem from './GalleryItem.svelte';

export default {
    title: 'Gallery/GalleryItem',
    component: GalleryItem,
};

const Template = (args) => ({
    Component: GalleryItem,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};