import "./style.scss";
import { LinkList } from "..";
import { Validator } from "./validator";
import { useState } from "react";
import { useAPI } from "../../../hooks/useAPI";
import { toast } from "react-toastify";
import { Spinner } from "../../Spinner";
import { submitOnMetaEnter } from "../../../toolbox/submit-on-meta-enter";
const validator = Validator('user-profile-links-add-form');

type AddNewProps = {
  onChange: (data: LinkList) => void;
  onClose: Function;
  linkList: LinkList;
}

export function AddNew({ onChange, onClose, linkList }: AddNewProps) {
  const { POST } = useAPI();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const $form = event.target as HTMLFormElement;
    const { data, valid } = validator.run();
    
    if (valid) {
      setLoading(true);
      const { label, href } = data;
      const newList = [ ...linkList, { label, href } ];

      POST('/linklist/set', newList)
        .then(() => {
          onChange(newList as LinkList);
          $form.reset();
          $form.querySelector('input')?.focus();
        })
        .catch(() => {
          toast.error('An error occurred while updating your link list');
        })
        .finally(() => {
          setLoading(false);
        })
    }
  };

  return (
    <div className="user-profile-links__add-new">
      <form
        id="user-profile-links-add-form"
        onSubmit={handleSubmit}
        onKeyDown={submitOnMetaEnter}
      >
        <div className="field">
          <label htmlFor="label">Label</label>
          <input type="text" name="label" maxLength={50} autoFocus/>
        </div>

        <div className="field">
          <label htmlFor="href">URL</label>
          <input type="text" name="href" />
        </div>

        <footer>
          <button
            type="button"
            disabled={loading}
            onClick={() => onClose()}
            className="button-light button--blocked"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="button-primary button--blocked"
          >
            {loading ? (
              <Spinner size="sm" />
            ) : (
              'Add'
            )}
          </button>
        </footer>
      </form>
    </div>
  )
}