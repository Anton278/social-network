import { fireEvent, screen } from "@testing-library/react";

export function fillRegisterPageInputs(
  username: string = "john123",
  email: string = "johndoe@gmail.com"
) {
  const emailInput = screen.getByLabelText("Email");
  const usernameInput = screen.getByLabelText("Username");
  const fullNameInput = screen.getByLabelText("Full name");
  const passwordInput = screen.getByLabelText("Password");
  const repeatPasswordInput = screen.getByLabelText("Repeat password");

  fireEvent.input(emailInput, { target: { value: email } });
  fireEvent.input(usernameInput, { target: { value: username } });
  fireEvent.input(fullNameInput, { target: { value: "John Doe" } });
  fireEvent.input(passwordInput, { target: { value: 123 } });
  fireEvent.input(repeatPasswordInput, { target: { value: 123 } });
}
