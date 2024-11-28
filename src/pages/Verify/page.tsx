import { useEffect, useState } from "react";
import "./style.scss";
import { Spinner } from "../../components/Spinner";
import { Information } from "../../components/Information";
import { toast } from "react-toastify";
import { useAPI } from "../../hooks/useAPI";
import { Link } from "react-router-dom";

type VerificationResult = Partial<{
  expired: boolean;
  verified: boolean;
}>

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-verify">
      {children}
    </div>
  )
}

export default function Page() {
  const { GET } = useAPI();
  const t = new URLSearchParams(window.location.search).get("t") || "";

  const [ loading, setLoading ] = useState(true);
  const [ result, setResult ] = useState<VerificationResult>({});
  const [ verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    if (!t) {
      setLoading(false);
      return;
    }

    GET('/auth/verify', { t })
      .then(response => response.json())
      .then(setResult)
      .finally(() => setLoading(false));
  }, []);

  const sendNewVerification = () => {
    setLoading(true);

    GET('/auth/resendv', { t })
      .then(() => {
        toast.success('A new verification e-mail was sent to you!');
        setVerificationSent(true);
      })
      .catch(() => {
        toast.error('An unexpected error happened while trying to send you a new verification e-mail. Please try again in a few minutes.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <PageWrapper>
        <Spinner />
      </PageWrapper>
    );
  }

  if (result.verified) {
    return (
      <PageWrapper>
        <Information
          type="success"
          title="Account Verified!"
          message="Your account is active now, thank you for verifying your e-mail"
          link={{ href: "/", label: "Ok" }}
        ></Information>
      </PageWrapper>
    );
  }

  if (result.expired) {
    return (
      <PageWrapper>
        <Information
          title="Token Expired"
          message="This confirmation token is not valid anymore"
        >
          <Link to="/">
            <button className="button--blocked">
              Ok
            </button>
          </Link>

          {!verificationSent && (
            <button
              className="button-seamless"
              onClick={sendNewVerification}
            >
              Send me a new verification e-mail
            </button>
          )}
        </Information>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Information
        title="Oops..."
        message="There is nothing here. This resource may be expired, moved or just don't exists anymore"
        link={{ href: "/", label: "Ok" }}
      ></Information>
    </PageWrapper>
  );
}