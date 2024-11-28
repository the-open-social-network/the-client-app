import "./style.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "../Spinner";
import { toast } from "react-toastify";
import { useAPI } from "../../hooks/useAPI";
import { Validator } from "./validator";
const validator = Validator('auth-box-form');

export function AuthBoxLogin() {
  const { POST } = useAPI();
  const [ loading, setLoading ] = useState<boolean>(false);

  const loginError = (message: string, toastId: string) => {
    toast.error(message, { toastId });
    setLoading(false);    
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }
    const { valid, data } = validator.run();

    if (!valid) {
      return;
    }

    setLoading(true);
    const { email, password } = data;

    POST('/auth/enter', { email, password })
      .then(() => window.location.reload())
      .catch(() => loginError('Invalid e-mail or password', 'err_request'));
  }

  return (
    <div className="auth-box-login">
      <h1 className="h2">Enter</h1>

      <form id="auth-box-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            autoFocus
            type="email"
            name="email"
            disabled={loading}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            disabled={loading}
            autoComplete="false"
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
            <span>Enter</span>
          )}
        </button>
      </form>
      
      <Link to="/forgot-password">Forgot password</Link>

      <hr />

      <Link to="/register">
        <button className="button--blocked">Register</button>
      </Link>
    </div>
  )
}