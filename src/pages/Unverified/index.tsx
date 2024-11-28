import { lazy } from "react";
import { LazyLoading } from "../../components/SplashScreen";

const Page = lazy(() => import('./page'));

export function Unverified() {
  return (
    <LazyLoading>
      <Page />
    </LazyLoading>
  );
}