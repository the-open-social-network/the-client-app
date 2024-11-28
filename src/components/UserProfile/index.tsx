import './style.scss';
import { Avatar } from '../Avatar';
import IconVerified from '../Icons/IconVerified';
import IconMoreVert from '../Icons/IconMoreVert';
import { PopOver } from '../PopOver';
import { useState } from 'react';
import { UserProfileEdit } from '../UserProfileEdit';
import { UserProfileLinks } from '../UserProfileLinks';
import { Me } from '../../contexts/auth-context';

type UserProfileProps = {
  profile: Me;
};

export function UserProfile({ profile }: UserProfileProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openUserLinks, setOpenUserLinks] = useState(false);
  const [openMoreActions, setOpenMoreActions] = useState(false);

  if (!profile) {
    return null;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__background">
        {profile.bg && (
          <img src={profile.bg} alt="User's background image" />
        )}
      </div>

      <div className="user-profile__information">
        <header>
          <Avatar
            size={100}
            alt="User's avatar"
            src="https://placehold.co/400"
          />

          <div className="user-profile__actions">
            <button
              className='button-ghost button--small'
              onClick={() => setOpenUserLinks(true)}
            >
              Links
            </button>

            <button
              className='button--small'
              onClick={() => setOpenEdit(true)}
            >
              Edit
            </button>

            <div className="user-profile__more-holder">
              <button
                className="button-brick button--small"
                onClick={() => setOpenMoreActions(!openMoreActions)}
              >
                <IconMoreVert />
              </button>

              <PopOver
                open={openMoreActions}
                position={{ top: 28, right: '0' }}
                onClickAway={() => setOpenMoreActions(!openMoreActions)}
              >
                <ul className='user-profile__more-actions'>
                  <li>
                    <button className='button-ghost'>
                      Add to lists
                    </button>
                  </li>
                  <li>
                    <button className='button-ghost'>
                      Mute account
                    </button>
                  </li>
                  <li>
                    <button className='button-ghost'>
                      Block account
                    </button>
                  </li>
                  <li>
                    <button className='button-ghost'>
                      Report account
                    </button>
                  </li>
                </ul>
              </PopOver>
            </div>
          </div>
        </header>

        <div className="user-profile__identification">
          <h2>{profile.fullname}</h2>
          <p>@{profile.handle}</p>

          {profile.domain && (
            <a href={profile.domain} target="__blank">
              {profile.domain} <IconVerified />
            </a>
          )}
        </div>
        
        {profile.minibio && (
          <div className="user-profile__bio">
            <p>{profile.minibio}</p>
          </div>
        )}
      </div>

      <div className="user-profile__stats">
        <a href="/followers"><b>5K</b> followers</a>
        <a href="/following"><b>236</b> following</a>
        <span><b>2.3K</b> posts</span>
      </div>

      <UserProfileEdit
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <UserProfileLinks
        open={openUserLinks}
        userid={profile.userid}
        onClose={() => setOpenUserLinks(false)}
      />
    </div>
  );
}