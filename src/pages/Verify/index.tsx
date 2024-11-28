import { lazy } from "react";
import { LazyLoading } from "../../components/SplashScreen";

const Page = lazy(() => import('./page'));

export function Verify() {
  return (
    <LazyLoading>
      <Page />
    </LazyLoading>
  );
}