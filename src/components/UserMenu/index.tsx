import './style.scss';
import { Avatar } from '../Avatar';
import { userMenuItems } from './items';
import { NewPostButton } from '../NewPostButton';
import { Link } from 'react-router-dom';

export function UserMenu() {
  return (
    <aside className='user-menu'>
      <nav>
        <Avatar
          href="/profile"
          alt="User's avatar"
          src="https://placehold.co/400"
        />

        <ul>
          {userMenuItems.map(item => (
            <li key={item.href}>
              <Link to={item.href}>
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <NewPostButton />
      </nav>
    </aside>
  );
}
