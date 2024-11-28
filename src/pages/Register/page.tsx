import "./style.scss";
import { AuthBoxRegister } from "../../components/AuthBoxRegister";
import { Step, Stepper } from "../../components/Stepper";
import { useState } from "react";
import { ServerRules } from "../../components/ServerRules";
import { Link } from "react-router-dom";
import IconArrowLeft from "../../components/Icons/IconArrowLeft";
import { Information } from "../../components/Information";
import { dimEmail } from "../../toolbox/string-utils";
import IconEmail from "../../components/Icons/IconEmail";
import { Dialog } from "../../components/Dialog";

export default function Page() {
  const [ step, setStep ] = useState(1);
  const [ registered, setRegistered ] = useState('');
  const [ goBackWarn, setGoBackWarn ] = useState(false);

  const handleGoBack = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (step === 2) {
      setGoBackWarn(true);
      event.preventDefault();
    }
  }

  return (
    <div className="page-register">
      <div className="page-register__content">
        <h1>
          <Link to="/" onClick={handleGoBack}><IconArrowLeft/></Link> Register
        </h1>

        <Stepper
          active={step}
          resetScrollPosition={true}
        >
          <Step>
            <ServerRules onAccept={() => setStep(2)}/>
          </Step>

          <Step>
            <AuthBoxRegister
              onSuccess={email => {
                setRegistered(email);
                setStep(3);
              }}
            />
          </Step>

          <Step>
            <Information
              title="Verify"
              icon={<IconEmail />}
              link={{ href: "/", label: "Ok" }}
            >
              <p>We sent a verification e-mail to:</p>
              <p><b>{dimEmail(registered)}</b></p>
              <p>Please check your inbox and click on the confirmation link to activate your account.</p>
            </Information>            
          </Step>
        </Stepper>
      </div>

      <Dialog
        title="Go back?"
        open={goBackWarn}
        confirmationLabel="Yes, go back"
        description="This will discard the form data, do you want to proceed?"
        onClose={() => setGoBackWarn(false)}
        onCancel={() => setGoBackWarn(false)}
        onConfirm={() => {
          setStep(1);
          setGoBackWarn(false);
        }}
      ></Dialog>
    </div>
  )
}