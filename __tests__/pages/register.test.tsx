import { fireEvent, render, screen } from "@testing-library/react";
import { api } from "@/http/api";
import MockAdapter from "axios-mock-adapter";

import Register from "@/pages/register";

const mock = new MockAdapter(api);

mock
  .onGet("/users")
  .reply(200, [
    { email: "jogndoe@gmail.com", username: "john123", userId: "1" },
  ]);
mock
  .onPost("/auth/register")
  .reply(500, { message: "auth/email-already-in-use" });
mock.onPost("/users").reply(500, { code: "users/create-user-error" });

describe("register page form", () => {
  it("should return error if username taken", async () => {
    render(<Register />);

    const emailInput = screen.getByLabelText("Email");
    const usernameInput = screen.getByLabelText("Username");
    const fullNameInput = screen.getByLabelText("Full name");
    const passwordInput = screen.getByLabelText("Password");
    const repeatPasswordInput = screen.getByLabelText("Repeat password");

    fireEvent.input(emailInput, { target: { value: "johndoe@gmail.com" } });
    fireEvent.input(usernameInput, { target: { value: "john123" } });
    fireEvent.input(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.input(passwordInput, { target: { value: 123 } });
    fireEvent.input(repeatPasswordInput, { target: { value: 123 } });

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const errorTxt = await screen.findByTestId("error-txt");
    expect(errorTxt.innerHTML).toBe("User with this username already exist");
  });

  it("should return error if email taken", async () => {
    render(<Register />);

    const emailInput = screen.getByLabelText("Email");
    const usernameInput = screen.getByLabelText("Username");
    const fullNameInput = screen.getByLabelText("Full name");
    const passwordInput = screen.getByLabelText("Password");
    const repeatPasswordInput = screen.getByLabelText("Repeat password");

    fireEvent.input(emailInput, { target: { value: "johndoe@gmail.com" } });
    fireEvent.input(usernameInput, { target: { value: "john007" } }); // username is available
    fireEvent.input(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.input(passwordInput, { target: { value: 123 } });
    fireEvent.input(repeatPasswordInput, { target: { value: 123 } });

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const errorTxt = await screen.findByTestId("error-txt");
    expect(errorTxt.innerHTML).toBe("Error: Email already in use");
  });

  // it("should delete user from firebase auth if occured error on creating user", async () => {});
});
