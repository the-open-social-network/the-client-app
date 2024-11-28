import { lazy } from "react";
import { LazyLoading } from "../../components/SplashScreen";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Layout = lazy(() => import('./layout'));

export function LayoutDefault() {
  const { logged } = useAuth();
  const navigate = useNavigate();

  if (!logged) {
    navigate("/");
  }

  return (
    <LazyLoading>
      <Layout />
    </LazyLoading>
  );
}