import D4 from "./index.vue";

import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof D4> = {
  title: "D4",
  component: D4,
  render: (args) => ({
    components: { D4 },
    tags: ["autodocs"],  // docsが不要だったら削除してOK
    setup() {
      return { args };
    },
    template: '<D4 v-bind="args" />',
  }),
  argTypes: {
    rolling: {
      control: 'boolean',
    },
    n: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
      }
    },
    maxN: {
      control: {
        type: 'inline-radio',
      },
      options: [4, 6, 8, 10, 12, 20],
    }
  },
};
export default meta;
type Story = StoryObj<typeof D4>;

export const Component: Story = {
  args: {
    rolling: false,
    n: 3,
    maxN: 4,
  },
};
