process.env.TZ = "America/Chicago"; // default our tests to use our timezone
// process.env.TZ = 'UTC';

import sinon from "sinon";
import { NativeModules } from "react-native";
import { QueryClient } from "react-query";
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
NativeModules.EventManager = {
  addListener: jest.fn(),
};

global.sinon = sinon;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const origConsole = console.error;
beforeEach(() => {
  console.error = () => {
  };
});
afterEach(() => {
  console.error = origConsole;
  sinon.restore();
  queryClient.clear();
});
