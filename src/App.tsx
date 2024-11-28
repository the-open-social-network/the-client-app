import "./ui-kit/fonts/work-sans/style.css";
import "./ui-kit/fonts/merriweather/style.css";
import "./ui-kit/main.scss";
import "./style.scss";

import { Routes } from './router'
import { useAuth } from './hooks/useAuth';
import { SplashScreen } from './components/SplashScreen';

export function App() {
  const { loading } = useAuth();

  return loading ? <SplashScreen /> : <Routes />;
}