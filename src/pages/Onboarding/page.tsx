import "./style.scss";
import { Validator } from "./validator";
import { DomainInput } from "../../components/DomainInput";
import { HANDLEPICKERSTATES, HandlePicker } from "../../components/HandlePicker";
import { useAPI } from "../../hooks/useAPI";
import { toast } from "react-toastify";
import { Spinner } from "../../components/Spinner";
import { normalizeHandle } from "../../toolbox/string-utils";
import { useState } from "react";
const validator = Validator('onboarding-form');

export default function Page() {
  const { POST } = useAPI();
  const [loading, setLoading] = useState(false);
  const [handleValidity, setHandleValidity] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { valid, data } = validator.run();
    const { fullname, handle, domain } = data;

    if (valid && handleValidity !== HANDLEPICKERSTATES.VALID) {
      toast.error('You must define a valid handle');
      return;
    }

    if (valid) {
      setLoading(true);

      POST('/profile/create', {
        handle: normalizeHandle(handle),
        fullname,
        domain,
      })
        .then(response => response.json())
        .then(data => {
          if (data.domainVerificationFailed) {
            toast.error('The domain verification has failed!');
            validator.redmark(['domain']);
            setLoading(false);
          }

          if (data.handleExists) {
            toast.error('This @handle has already being used by someone');
            validator.redmark(['handle']);
            setLoading(false);
          }

          if (data.created) {
            toast.success('Identification successfully created');
            window.location.href = "/profile";
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
        })
        .finally(() => {
          setLoading(false)
        });
    }
  }

  return (
    <div className="page-onboarding">
      <div className="page-onboarding__content">
        <header>
          <h1>Welcome!</h1>

          <p>
            Before you start interacting, you need to create your identification, this will define 
            how other people will recognize you here. You can change this information whenever you 
            want from your settings panel.
          </p>
        </header>

        <form id="onboarding-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="fullname">
              Your Name
            </label>

            <input
              autoFocus
              type="text"
              name="fullname"
              disabled={loading}
              placeholder="E.g.: Kim Young"
            />
          </div>

          <HandlePicker
            disabled={loading}
            onChangeValidity={setHandleValidity}
          />
          
          <DomainInput
            disabled={loading}
            toggle="I want to add my domain"
          />

          <hr />

          <button
            type="submit"
            disabled={loading}
            className="button-primary button--blocked"
          >
            {loading ? (
              <Spinner size="sm" />
            ) : (
              'Proceed'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}