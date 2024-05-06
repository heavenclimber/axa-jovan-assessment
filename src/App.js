import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@configs/Store";
import AppRoutes from "@routes";
import { ToastContainer, toast } from "react-toastify";
import { TopBar } from "@components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <TopBar />
          <AppRoutes />
          <ToastContainer
            enableMultiContainer
            containerId={"A"}
            position={toast.POSITION.TOP_RIGHT}
            theme="colored"
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
