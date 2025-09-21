import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutUserLayout } from "../features/layout";
import { ScrollToTop } from "../components";
import PATH from "./path.js";
import { NotFoundPage } from "../components";

// Pages
const HomePage = lazy(() => import("../features/home/page/HomePage.jsx"));
const ProductsPage = lazy(() =>
  import("../features/products/page/ProductsPage.jsx")
);
const ProductDetailPage = lazy(() =>
  import("../features/product-detail/page/ProductDetailPage.jsx")
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* User Layout with nested routes */}
        <Route path={PATH.USER_LAYOUT} element={<LayoutUserLayout />}>
          <Route index path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.PRODUCTS} element={<ProductsPage />} />
          <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        </Route>

        {/* Not Found Page 
          Please use /not-found if you want to navigate to the not found page
        */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
