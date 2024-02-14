import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import DarkMode from "../components/DarkMode";

test("renders dark mode button", async () => {
  const darkMode = render(<DarkMode />);

  const button = await darkMode.findByTestId("dark-mode-button");

  expect(button).toHaveProperty("title", "Toggle light mode");

  fireEvent.click(button);

  expect(button).toHaveProperty("title", "Toggle dark mode");

  darkMode.unmount();
});
