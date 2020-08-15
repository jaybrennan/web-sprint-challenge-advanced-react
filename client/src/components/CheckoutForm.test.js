import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  getByText("Checkout Form");
});

test("form shows success message on submit with form details", () => {
  const { getByText, getByLabelText, getByTestId } = render(<CheckoutForm />);
  const inputSetup = (label) => {
    const input = getByLabelText(label)
    return {
      input,
    }
  }

  const handleInput = (label, inputValue) => {
    const { input } = inputSetup(label)
    fireEvent.change(input, {target: {value: inputValue}})
  };

  const firstName = "Jay";
  const lastName = "Brennan";
  const address = "123 New Street";
  const city = "Boston";
  const state = "MA";
  const zip = "02110";

  handleInput("First Name:", firstName);
  handleInput("Last Name:", lastName);
  handleInput("Address:", address);
  handleInput("City:", city);
  handleInput("State:", state);
  handleInput("Zip:", zip);

  const checkoutButton = getByText("Checkout");
  
  fireEvent.click(checkoutButton);

  const successMessage = getByTestId("successMessage");

  expect(successMessage.textContent)
    .toBe(`You have ordered some plants! Woo-hoo! 🎉Your new green friends will be shipped to:${firstName} ${lastName}${address}${city}, ${state} ${zip}`)
});