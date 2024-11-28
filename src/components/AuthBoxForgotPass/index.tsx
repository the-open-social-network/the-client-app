import "./style.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "../Spinner";
import { useAPI } from "../../hooks/useAPI";
import { serializeFormData } from "../../toolbox/serialize-form-data";

export function AuthBoxForgotPass() {
  const { POST } = useAPI();
  const [ loading, setLoading ] = useState<boolean>(false);

  const handleError = () => {
    setLoading(false);
  }

  const handleSuccess = () => {

  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const data = new FormData(event.target as HTMLFormElement);
    const { email, password, repassword } = serializeFormData(data);

    POST('/auth/register', {
      email,
      password,
      repassword
    })
      .then(handleSuccess)
      .catch(handleError);
  }

  return (
    <div className="auth-box-forgot-pass">
      <h1 className="h2">Forgot Password</h1>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            autoFocus
            type="email"
            name="email"
            disabled={loading}
          />
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
      
      <Link to="/">Go Back</Link>
    </div>
  )
}