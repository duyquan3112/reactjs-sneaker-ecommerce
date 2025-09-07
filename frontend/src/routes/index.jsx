import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutUserLayout } from "../features/layout";
import { ScrollToTop } from "../components";
import PATH from "./path.js";
import HomePage from "../pages/HomePage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";
import { NotFoundPage } from "../components";

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
        <Route path={PATH.USER_LAYOUT} element={<LayoutUserLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATH.PRODUCTS} element={<ProductsPage />} />
          <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
