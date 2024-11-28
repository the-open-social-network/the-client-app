import './style.scss';
import { Modal } from '../Modal';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { Validator } from './validator';
import { useAPI } from '../../hooks/useAPI';
import { toast } from 'react-toastify';
import { TextArea } from '../TextArea';
import { submitOnMetaEnter } from '../../toolbox/submit-on-meta-enter';
const validator = Validator('user-profile-edit-form');

type ProfileEditProps = {
  open: boolean;
  onClose: Function;
}

export function UserProfileEdit({ open, onClose }: ProfileEditProps) {
  const { me, updateMe } = useAuth();
  const { POST } = useAPI();
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, valid } = validator.run();

    if (loading || !valid) {
      return;
    }

    const { fullname, minibio } = data;

    POST('/profile/edit', { minibio, fullname })
      .then(() => {
        toast.success('Profile updated');
        updateMe({ fullname, minibio });
        onClose();
      })
      .catch(() => toast.error('Unable to update profile'))
      .finally(() => setLoading(false));
  }

  return (
    <Modal
      open={open}
      lightbox={true}
      onClose={onClose}
      dropOnBody={true}
      stickedFooter={true}
      title="Edit profile"
    >
      <div className="user-profile-edit-wrapper">
        <div className="user-profile-edit">
          <div className="user-profile-edit__information">
            <form
              onSubmit={onSubmit}
              id="user-profile-edit-form"
              onKeyDown={submitOnMetaEnter}
            >
              <div className="fields">
                <div className="field">
                  <label htmlFor="fullname">Name</label>
                  <input
                    autoFocus
                    type="text"
                    name="fullname"
                    defaultValue={me.fullname}
                  />
                </div>

                <div className="field">
                  <label>Bio</label>

                  <TextArea
                    name="minibio"
                    maxLength={300}
                    defaultValue={me.minibio}
                  />
                </div>
              </div>
              
              <footer>
                <button
                  type="button"
                  disabled={loading}
                  className="button-light button--blocked"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary button--blocked"
                >
                  Save
                </button>                
              </footer>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}