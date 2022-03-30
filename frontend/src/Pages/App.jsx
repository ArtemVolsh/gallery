import React from "react";

import { Routes, Route } from "react-router-dom";

function App() {
  function conditionalRender() {
    if (!isAuth) {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="exhibitions" element={<ExhibitionsPage />} />
            <Route path="about" element={<InfoPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      );
    } else if (isAdmin) {
      return (
        <Routes>
          <Route>
						<Route />
					</Route>
        </Routes>
      );
    } else if (isUser) {
    } else {
      return null;
    }
  }
}
