import { lazy } from "react";
import { LazyLoading } from "../../components/SplashScreen";

const Page = lazy(() => import('./page'));

export function Onboarding() {
  return (
    <LazyLoading>
      <Page />
    </LazyLoading>
  );
}