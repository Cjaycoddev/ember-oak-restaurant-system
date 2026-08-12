import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../shared/layouts/MainLayout";

import HomePage from "../features/home/pages/HomePage";
import AboutPage from "../features/about/pages/AboutPage";
import MenuPage from "../features/menu/pages/MenuPage";
import GalleryPage from "../features/gallery/pages/GalleryPage";
import ReservationsPage from "../features/reservations/pages/ReservationsPage";
import ContactPage from "../features/contact/pages/ContactPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;