import "./style.scss";
import { AuthBoxForgotPass } from "../../components/AuthBoxForgotPass";

export default function Page() {
  return (
    <div className="page-forgot-pass">
      <div className="page-forgot-pass__form">
        <AuthBoxForgotPass />
      </div>
    </div>
  )
}