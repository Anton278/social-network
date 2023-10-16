import { RootState, makeStore } from "@/redux/store";
import { CombinedState, PreloadedState } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

function renderWithRedux(
  component: JSX.Element,
  preloadedState?: PreloadedState<CombinedState<RootState>>
) {
  const store = makeStore(preloadedState);
  render(<Provider store={store}>{component}</Provider>);
}

export { renderWithRedux };
