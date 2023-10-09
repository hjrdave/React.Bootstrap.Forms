import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./DayPicker";

export default {
  title: "Design System/Atoms/DayPicker",
  component: Comp,
  argTypes: {
    message: {
      control: "text",
    },
  },
} as Meta<typeof Comp>;

const PrimaryTemplate: StoryFn<typeof Comp> = (args) => (
  <Comp {...args} onSelect={() => null} />
);
export const Primary = PrimaryTemplate.bind({});
Primary.args = {};
