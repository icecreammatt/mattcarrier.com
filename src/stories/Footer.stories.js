import Footer from './Footer.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
    title: 'Footer',
    component: Footer,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    //     label: { control: 'text' },
    //     onClick: { action: 'onClick' },
    //     primary: { control: 'boolean' },
    //     size: {
    //         control: { type: 'select' },
    //         options: ['small', 'medium', 'large'],
    //     },
    // },
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
    Component: Footer,
    props: args,
    // on: {
    //     click: args.onClick,
    // },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
    // primary: true,
    // label: 'Footer',
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//     label: 'Footer',
// };

// export const Large = Template.bind({});
// Large.args = {
//     size: 'large',
//     label: 'Footer',
// };

// export const Small = Template.bind({});
// Small.args = {
//     size: 'small',
//     label: 'Footer',
// };
