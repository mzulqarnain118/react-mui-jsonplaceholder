import type React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants";
import PostDetailPage from "../components/PostDetail";
import PostFormPage from "../components/PostForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.HOME} replace />}
      />
      <Route path={ROUTES.POST_DETAIL(1)} element={<PostDetailPage />} />
      <Route path={ROUTES.CREATE} element={<PostFormPage />} />
      <Route path={ROUTES.EDIT(1)} element={<PostFormPage />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRoutes;
