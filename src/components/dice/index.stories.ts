import Dice from "./index.vue";

import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof Dice> = {
  title: "Dices",
  component: Dice,
  render: (args) => ({
    components: { Dice },
    tags: ["autodocs"],  // docsが不要だったら削除してOK
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-2">
        <Dice v-bind="args" dice-type="D4" />
        <Dice v-bind="args" dice-type="D6" />
        <Dice v-bind="args" dice-type="D8" />
        <Dice v-bind="args" dice-type="D10" />
        <Dice v-bind="args" dice-type="D12" />
        <Dice v-bind="args" dice-type="D20" />
      </div>
    `,
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
  },
};
export default meta;
type Story = StoryObj<typeof Dice>;

export const Component: Story = {
  args: {
    rolling: false,
    n: 3,
  },
};
