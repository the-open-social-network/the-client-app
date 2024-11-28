import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import IconEmail from "../../components/Icons/IconEmail";
import { Information } from "../../components/Information";
import "./style.scss";
import { toast } from "react-toastify";
import { Spinner } from "../../components/Spinner";
import { useAPI } from "../../hooks/useAPI";

export default function Page() {
  const { GET } = useAPI();
  const [ resendAllowed, setResendAllowed ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const { signOut } = useAuth();
  const { me } = useAuth();

  const sendNewVerification = () => {
    setLoading(true);

    GET('/auth/resendv', { u: me.userid })
      .then(() => {
        toast.success('We just sent you a new verification e-mail!')
        setResendAllowed(false);
      })
      .catch(() => {
        toast.error('An unexpected error happened while trying to send you a new verification e-mail. Please try again in a few minutes.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="page-unverified">
      <Information
        icon={<IconEmail />}
        title="Confirmation Pending"
      >
        <p>You received a verification email at:</p>
        <p><b>{me.email}</b></p>
        <p>Please check your inbox, locate the verification e-mail and click on the confirmation link to activate your account.</p>

        <button
          onClick={() => window.location.reload()}
          className="button-primary button--blocked"
        >
          I already confirmed
        </button>

        <button
          disabled={!resendAllowed}
          className="button--blocked"
          onClick={sendNewVerification}
        >
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <>Send me another e-mail</>
          )}
        </button>
        
        <button
          onClick={signOut}
          className="button-seamless button--blocked"
        >
          <b>Sign out</b>
        </button>
      </Information>
    </div>
  );
}