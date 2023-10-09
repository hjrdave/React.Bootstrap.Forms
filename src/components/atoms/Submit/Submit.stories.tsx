import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./Submit";

export default {
  title: "Design System/Atoms/Submit",
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
