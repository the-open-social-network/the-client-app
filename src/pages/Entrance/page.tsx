import "./style.scss";
import { AuthBoxLogin } from "../../components/AuthBoxLogin";

export default function Page() {
  return (
    <div className="page-entrance">
      <AuthBoxLogin />
    </div>
  );
}