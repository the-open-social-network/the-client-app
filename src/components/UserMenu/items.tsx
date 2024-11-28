import IconHome from '../Icons/IconHome';
import IconSearch from '../Icons/IconSearch';
import IconBell from '../Icons/IconBell';
import IconComunity from '../Icons/IconComunity';
import IconSettings from '../Icons/IconSettings';
import IconProfile from '../Icons/IconProfile';
import IconArticle from '../Icons/IconArticle';
import IconCheckList from '../Icons/IconCheckList';

export const userMenuItems = [
  {
    href: '/',
    icon: <IconHome />,
    label: 'Home',
  },
  {
    href: '/profile',
    icon: <IconProfile />,
    label: 'Profile',
  },
  {
    href: '/search',
    icon: <IconSearch />,
    label: 'Search',
  },
  {
    href: '/notifications',
    icon: <IconBell />,
    label: 'Notifications',
  },
  {
    href: '/communities',
    icon: <IconComunity />,
    label: 'Communities',
  },
  {
    href: '/articles',
    icon: <IconArticle />,
    label: 'Articles',
  },
  {
    href: '/lists',
    icon: <IconCheckList />,
    label: 'My Lists',
  },  
  {
    href: '/settings',
    icon: <IconSettings />,
    label: 'Settings',
  },
];