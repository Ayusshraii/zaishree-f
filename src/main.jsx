import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your providers
import { CartProvider } from "./context/Cartcontext";
import { WishlistProvider } from "./context/WishlistContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <SubscriptionProvider>
      <CartProvider>
        <WishlistProvider>
          <App />

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </WishlistProvider>
      </CartProvider>
      </SubscriptionProvider>
    </BrowserRouter>
  </React.StrictMode>
);