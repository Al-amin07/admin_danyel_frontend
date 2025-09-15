import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./SocketProvider";
import { persistor, store } from "@/store/store";

const ReduxProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider />
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProviderWrapper;
