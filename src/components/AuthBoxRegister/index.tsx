import "./style.scss";

import { Spinner } from "../Spinner";
import IconEye from "../Icons/IconEye";
import IconEyeNot from "../Icons/IconEyeNot";
import { AuthBoxRegisterHelp } from "../AuthBoxRegisterHelp";
import IconInfo from "../Icons/IconInfo";
import { Validator } from "./validator";
import { toast } from "react-toastify";
import { useAPI } from "../../hooks/useAPI";
import { useState } from "react";
const validator = Validator('auth-box-register-form');

type AuthBoxRegisterProps = {
  onSuccess: (email: string) => void;
}

export function AuthBoxRegister({ onSuccess }: AuthBoxRegisterProps) {
  const { POST } = useAPI();

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ showHelp, setShowHelp ] = useState<boolean>(false);
  const [ passVisible, setPassVisible ] = useState<boolean>(false);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }
    
    const { valid, data } = validator.run();

    if (!valid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { email, agreement, password, repassword } = data;

    POST('/auth/register', {
      email,
      agreement,
      password,
      repassword,
    })
      .then(() => {
        if (onSuccess) {
          onSuccess(email);
        }    
      })
      .catch(() => {
        toast.error('An unexpected error occurred with your registration process')
        setLoading(false);    
      });
  }

  return (
    <div className="auth-box-register">
      {showHelp && (
        <AuthBoxRegisterHelp
          {...(validator.data())}
          onClose={() => setShowHelp(false)}
        />
      )}

      <header>
        <div>
          <h2 className="h2">Informations</h2>
        </div>

        <div className="auth-box-register__actions">
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowHelp(true)}
            className="button-brick button-light registration-help-box-trigger"
          >
            <IconInfo />
          </button>

          <button
            type="button"
            disabled={loading}
            className="button-brick button-light"
            onClick={() => setPassVisible(!passVisible)}
            title={`${passVisible ? "Hide" : "Show"} password`}
          >
            {passVisible ? <IconEyeNot /> : <IconEye />}
          </button>
        </div>
      </header>
      
      <form
        noValidate
        onSubmit={handleSubmit}
        id="auth-box-register-form"
      >
        <div className="field">
          <label htmlFor="email">
            E-mail
          </label>
          
          <input
            autoFocus
            type="email"
            name="email"
            disabled={loading}
          />
        </div>

        <div className="field">
          <label htmlFor="password">
            Password
          </label>

          <input
            name="password"
            disabled={loading}
            autoComplete="false"
            type={passVisible ? "text" : "password"}
          />
        </div>

        <div className="field">
          <label htmlFor="password">
            Confirm Password
          </label>

          <input
            name="repassword"
            disabled={loading}
            autoComplete="false"
            type={passVisible ? "text" : "password"}
          />
        </div>

        <div className="field switch">
          <label>
            <input
              value="agreed"
              type="checkbox"
              name="agreement"
              disabled={loading}
            />

            I agree with the platform <a href="/">Terms and Conditions</a>
          </label>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="button-primary button--blocked"
        >
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <span>Continue</span>
          )}
        </button>
      </form>
    </div>
  )
}