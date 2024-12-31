import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import HomePage from "../pages/Home.page";
import BookPage from "../pages/Book.page";
import FavoritesPage from "../pages/Favorites.page";
import Aboutpage from "../pages/About.page";
import LoginSignupPage from "../pages/LoginSignup.Page";
import EditBookPage from "../pages/EditBook.page";
import AdminPage from "../pages/Admin.page";
import UserPage from "../pages/User.page";
import ProtectRoute from "./ProtectRoute";


export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.BOOKPAGE} element={<BookPage />} />
      <Route path={ROUTES.FAVORITES} element={
        <ProtectRoute>
          <FavoritesPage />
        </ProtectRoute>
      } />
      <Route path={ROUTES.ABOUT} element={<Aboutpage />} />

      <Route path={ROUTES.ADD_BOOK} element={
        <ProtectRoute isBusiness isAdmin>
          <EditBookPage />
        </ProtectRoute>
      } />
      <Route path={ROUTES.EDIT_BOOK} element={
        <ProtectRoute isBusiness isAdmin>
          <EditBookPage />
        </ProtectRoute>
      } />

      <Route path={ROUTES.LOGIN_SIGNUP} element={<LoginSignupPage />} />

      <Route path={ROUTES.ADMIN} element={
        <ProtectRoute isAdmin>
          <AdminPage />
        </ProtectRoute>
      } />
      <Route path={ROUTES.USER} element={
        <ProtectRoute isAdmin>
          <UserPage />
        </ProtectRoute>
      } />
    </Routes>
  );
}
