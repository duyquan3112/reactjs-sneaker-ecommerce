import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import UserLayout from "../components/Layouts/UserLayout.jsx";
import PATH from "./path.js";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Layout */}
        <Route path={PATH.USER_LAYOUT} element={<UserLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
