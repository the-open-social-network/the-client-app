import "./style.scss";
import { useAuth } from "../../hooks/useAuth";
import { Entrance } from "../../pages/Entrance";
import { Dashboard } from "../../components/Dashboard";
import { UserMenu } from "../../components/UserMenu";
import { Outlet } from "react-router-dom";

export default function Home() {
  const { logged } = useAuth();

  if (!logged) {
    return (
      <div className="app-inlet">
        <Entrance />
      </div>
    );
  }

  return (
    <Dashboard
      right={<UserMenu />}
    >
      <Outlet />
    </Dashboard>
  );
}