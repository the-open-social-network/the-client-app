import './style.scss';
import { Modal } from "../Modal";
import { Avatar } from '../Avatar';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAPI } from '../../hooks/useAPI';
import { UserLink } from './UserLink';
import { AddNew } from './AddNew';
import { toast } from 'react-toastify';
import { EditLink } from './EditLink';

export type UserProfileLinksProps = {
  userid: string;
  open?: boolean;
  onClose: Function;
};

export type LinkItem = {
  href: string;
  label: string;
}

export type LinkList = Array<LinkItem>

export function UserProfileLinks({open, userid, onClose}: UserProfileLinksProps) {
  const { GET } = useAPI();
  const { me } = useAuth();
  const canEdit = me.userid === userid;
  const [adding, setAdding] = useState(false);
  const [linkList, setLinkList] = useState<LinkList>([]);
  const [editing, setEditing] = useState<{ item: LinkItem, index: number }>();

  const handleClose = () => {
    setEditing(undefined);
    setAdding(false);
    onClose();
  }

  const handleChange = (newList: LinkList) => {
    setLinkList(newList);
    setAdding(false);
    setEditing(undefined);
    toast.success('Link list updated')
  };

  const getTitle = () => {
    if (adding) {
      return 'Adding a new link';
    }

    if (editing) {
      return 'Editing link';
    }

    return 'Links';
  }

  useEffect(() => {
    GET('/linklist/get', { u: userid })
      .then(response => response.json())
      .then(setLinkList)
      .catch(console.error)
  }, []);

  return (
    <Modal
      open={open}
      lightbox={true}
      dropOnBody={true}
      title={getTitle()}
      stickedFooter={true}
      onClose={handleClose}
      preventCloseOnBackdropClick={true}
    >
      <div className="user-profile-links">
        <div
          className="user-profile-links__content"
          style={{ display: (adding || editing) ? 'none' : 'block' }}
        >
          <div className="user-profile-links__info">
            <Avatar
              size={80}
              alt="User's avatar"
              src="https://placehold.co/400"
            />

            <p>User Name</p>
          </div>

          {linkList.length ? (
            <ul>
              {linkList.map((item, index) => (
                <UserLink
                  item={item}
                  canEdit={canEdit}
                  key={item.href+item.label+index}
                  onEdit={() => setEditing({ item, index })}
                />
              ))}
            </ul>
          ) : (
            <div className="user-profile-links__empty">
              <p>There are no links to show</p>
            </div>
          )}

          <footer>
            <button
              onClick={() => setAdding(true)}
              className="button-primary button--blocked"
            >
              Add
            </button>
          </footer>
        </div>

        {canEdit && adding && (
          <AddNew
            linkList={linkList}
            onChange={handleChange}
            onClose={() => setAdding(false)}
          />
        )}

        {canEdit && editing && (
          <EditLink
            editing={editing}
            linkList={linkList}
            onChange={handleChange}
            onClose={() => setEditing(undefined)}
          />          
        )}      
      </div>
    </Modal>
  )
}