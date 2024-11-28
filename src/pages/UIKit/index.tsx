import { lazy } from "react";
import { LazyLoading } from "../../components/SplashScreen";

const Page = lazy(() => import('./page'));

export function UIKit() {
  return (
    <LazyLoading>
      <Page />
    </LazyLoading>
  );
}