import "./style.scss";

import { checkPassword, isWebEmail } from "../../toolbox/string-utils";
import IconCheck from "../Icons/IconCheck";
import IconWarning from "../Icons/IconWarning";
import { Modal } from "../Modal";
import { PasswordRules } from "../PasswordRules";

type AuthBoxRegisterHelpProps = {
  email?: string;
  password?: string;
  agreement?: boolean;
  onClose: Function;
}

export function AuthBoxRegisterHelp({ onClose, password, email, agreement }: AuthBoxRegisterHelpProps) {
  const hasValidEmail = isWebEmail(email || "");
  const passwordInfo = checkPassword(password || "");
  
  const Check = (v: boolean) => (
    <span className="auth-box-register-help-check" data-ok={v}>
      {v ? <IconCheck /> : <IconWarning />}
    </span>
  );

  return (
    <Modal
      open
      lightbox
      dropOnBody
      onClose={onClose}
      title="Registering?"
    >
      <div className="auth-box-register-help">
        <p>
          To submit your registration data you must confirm 
          that you agree with our <b>{Check(!!agreement)} terms and conditions</b>, have
          a <b>{Check(hasValidEmail)} valid web e-mail</b> and set 
          a <b>{Check(passwordInfo.strong)} valid and strong password</b> that
          follows this rules:
        </p>

        <PasswordRules password={password || ""}/>
        <br/>

        <button
          onClick={() => onClose()}
          className="button--blocked"
        >
          Ok
        </button>
      </div>
    </Modal>
  )
}