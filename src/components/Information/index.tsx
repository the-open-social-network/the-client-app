import './style.scss';

import IconCheck from '../Icons/IconCheck';
import IconInfo from '../Icons/IconInfo';
import IconWarning from '../Icons/IconWarning';
import IconExclamation from '../Icons/IconExclamation';
import { SafeLink } from '../SafeLink';
import { css } from '../../toolbox/css';

type InformationProps = {
  type?: 'info'|'error'|'warn'|'success';
  color?: string;
  title: string;
  message?: string;
  icon?: React.ReactNode,
  children?: React.ReactNode;
  link?: { href: string, label: string };
};

export function Information({ children, title, message, link, color, icon, type }: InformationProps) {
  const getIcon = () => {
    if (icon) {
      return icon;
    }

    if (!type) {
      return <IconInfo />
    }

    return {
      info: <IconInfo />,
      error: <IconExclamation />,
      warn: <IconWarning />,
      success: <IconCheck />
    }[type] || <IconInfo />;
  }

  return (
    <div
      style={css({ '--color': color })}
      className={`information information--${type || 'none'}`}
    >
      <div className="information__content">
        {getIcon()}

        <h1>{title}</h1>
        <hr />

        {message && <p>{message}</p>}

        {children}

        {link?.href && link?.label && (
          <SafeLink to={link.href}>
            <button className="button-primary button--blocked">
              {link.label}
            </button>
          </SafeLink>
        )}
      </div>
    </div>
  );
}

