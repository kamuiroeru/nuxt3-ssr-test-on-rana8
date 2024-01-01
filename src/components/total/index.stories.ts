import Total from "./index.vue";

import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof Total> = {
  title: "Totals",
  component: Total,
  render: (args) => ({
    components: { Total },
    tags: ["autodocs"],  // docsが不要だったら削除してOK
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-2">
        <Total :total="6" />
        <Total :total="25" />
        <Total :total="123" />
      </div>
    `,
  })
};
export default meta;
type Story = StoryObj<typeof Total>;

export const Component: Story = {};
