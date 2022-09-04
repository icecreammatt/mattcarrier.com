import Gallery from './Gallery.svelte';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
};

const Template = (args) => ({
    Component: Gallery,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {};