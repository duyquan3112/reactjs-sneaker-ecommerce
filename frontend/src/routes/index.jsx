import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import UserLayout from "../components/Layouts/UserLayout.jsx";
import ScrollToTop from "../components/Common/ScrollToTop.jsx";
import PATH from "./path.js";
import HomePage from "../pages/HomePage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Not Found Page 
          Please use /not-found if you want to navigate to the not found page
        */}
        <Route path="*" element={<NotFoundPage />} />

        {/* User Layout with nested routes */}
        <Route path={PATH.USER_LAYOUT} element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATH.PRODUCTS} element={<ProductsPage />} />
          <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
