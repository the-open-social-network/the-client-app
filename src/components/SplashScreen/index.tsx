import "./style.scss";

import { Spinner } from "../Spinner";
import { Suspense } from "react";

export function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-screen__content">
        <Spinner />
      </div>
    </div>
  );
}

export function LazyLoading({ children }:{ children: React.ReactNode }) {
  return (
    <Suspense fallback={<SplashScreen />}>
      {children}
    </Suspense>
  )
}