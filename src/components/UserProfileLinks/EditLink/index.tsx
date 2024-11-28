import "./style.scss";
import { LinkItem, LinkList } from "..";
import { Validator } from "./validator";
import { useState } from "react";
import { useAPI } from "../../../hooks/useAPI";
import { toast } from "react-toastify";
import { Spinner } from "../../Spinner";
import IconLink from "../../Icons/IconLink";
import { submitOnMetaEnter } from "../../../toolbox/submit-on-meta-enter";
const validator = Validator('user-profile-links-edit-form');

type EditLinkProps = {
  editing: { item: LinkItem, index: number };
  onChange: (data: LinkList) => void;
  onClose: Function;
  linkList: LinkList;
}

export function EditLink({ editing, onChange, onClose, linkList }: EditLinkProps) {
  const { POST } = useAPI();
  const [loading, setLoading] = useState(false);

  const updateLinkList = (newList: LinkList) => {
    return POST('/linklist/set', newList)
      .catch(() => {
        toast.error('An error occurred while updating your link list');
      })
      .finally(() => {
        setLoading(false);
      })    
  }
  
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const $form = event.target as HTMLFormElement;
    const { data, valid } = validator.run({ context: editing.item });
    
    if (valid) {
      setLoading(true);
      const { label, href } = data;
      
      const newList = [ ...linkList ];
      newList[editing.index] = { label, href };

      updateLinkList(newList).then(() => {
        onChange(newList as LinkList);
        $form.reset();
        $form.querySelector('input')?.focus();
      });
    }
  };

  const handleRemove = () => {
    const newList = [ ...linkList ];
    newList.splice(editing.index, 1);

    updateLinkList(newList).then(() => {
      onChange(newList as LinkList);
    });
  }

  return (
    <div className="user-profile-links__edit">
      <p>Editing "{editing?.item?.label}" ({editing?.item?.href})</p>

      <form
        id="user-profile-links-edit-form"
        onSubmit={handleSubmit}
        onKeyDown={submitOnMetaEnter}
      >
        <div className="field">
          <label htmlFor="label">New Label</label>
          
          <input
            autoFocus
            type="text"
            name="label"
            maxLength={50}
            defaultValue={editing?.item?.label}
          />
        </div>

        <div className="field" data-input-icon="right">
          <label htmlFor="href">New URL</label>
          
          <input
            type="text"
            name="href"
            defaultValue={editing?.item?.href}
          />

          <a
            className="button button-brick button-ghost input-icon"
            href={editing?.item?.href}
            target="_blank"
          >            
            <IconLink />
          </a>

          <button
            type="button"
            onClick={handleRemove}
            className="button-seamless"
          >
            Remove
          </button>
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
              'Change'
            )}
          </button>
        </footer>
      </form>
    </div>
  )
}