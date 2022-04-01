import React from "react";

import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../Components/Layouts/MainLayout";
import { GalleryPage } from "./GalleryPage";
import { ExhibitionsPage } from "./ExhibitionsPage";
import { HomePage } from "./HomePage";
import { InfoPage } from "./InfoPage";
import { NewsPage } from "./NewsPage";
import { NotFoundPage } from "./NotFoundPage";

function App() {
  const isAuth = false;

  function checkUserType() {
    if (!isAuth) {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="exhibitions" element={<ExhibitionsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="about" element={<InfoPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      );
    }
  }

  return <>{checkUserType()}</>;
}

export default App;
