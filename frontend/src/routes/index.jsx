import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import UserLayout from "../components/Layouts/UserLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import PATH from "./path.js";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Layout with nested routes */}
        <Route path={PATH.USER_LAYOUT} element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATH.PRODUCTS} element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
