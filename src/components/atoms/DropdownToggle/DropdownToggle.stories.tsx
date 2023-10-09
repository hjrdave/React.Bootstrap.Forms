import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./DropdownToggle";

export default {
  title: "Design System/Atoms/DropdownToggle",
  component: Comp,
  argTypes: {
    message: {
      control: "text",
    },
  },
} as Meta<typeof Comp>;

const PrimaryTemplate: StoryFn<typeof Comp> = (args) => <Comp {...args} />;
export const Primary = PrimaryTemplate.bind({});
Primary.args = {};
