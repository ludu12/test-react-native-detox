import { render as rtlRender } from "@testing-library/react-native";
import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./setup-jest";

// This method is used in jest.mock() and must be prefixed with 'mock'.
// It is important that the mockComponent vairable here is the same name as the component that is exported
export function mockComponentFactory(mockComponent) {
  const View = require("react-native").View;
  return {
    [mockComponent]: jest.fn().mockImplementation(() => <View testID={mockComponent} />),
  };
}

export const TestWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

function render(ui,
                {
                  initialState = {},
                  ...renderOptions
                } = {}) {
  function Wrapper({ children }) {
    return <TestWrapper>{children}</TestWrapper>;
  }

  return { ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { render };
