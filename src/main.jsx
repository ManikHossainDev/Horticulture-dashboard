import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3FB249",
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
