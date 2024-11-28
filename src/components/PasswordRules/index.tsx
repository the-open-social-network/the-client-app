import { checkPassword } from "../../toolbox/string-utils";
import IconCheck from "../Icons/IconCheck";
import IconWarning from "../Icons/IconWarning";
import "./style.scss";

export function PasswordRules({ password }:{ password: string}) {
  const { details } = checkPassword(password);

  const Check = (v: boolean) => (
    <span className="auth-box-register-help-check" data-ok={v}>
      {v ? <IconCheck /> : <IconWarning />}
    </span>
  );
  
  return (
    <ul className="password-rules-list">
      <li>{Check(details.minLengthOk)} At least 8 chars</li>
      <li>{Check(details.hasUpperCase)} At least one uppercase char</li>
      <li>{Check(details.hasLowerCase)} At least one lowercase char</li>
      <li>{Check(details.hasNumber)} At least one number</li>
      <li>{Check(details.hasSpecialChar)} At least one special char, e.g.: !,@,#,$, etc</li>
    </ul>
  );
}