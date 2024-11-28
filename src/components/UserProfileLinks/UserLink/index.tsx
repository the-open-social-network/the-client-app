import "./style.scss";
import { LinkItem } from "..";

type UserLinkProps = {
  item: LinkItem;
  canEdit: boolean;
  onEdit: Function;
}

export function UserLink({ item, canEdit, onEdit }: UserLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (canEdit) {
      event.preventDefault();
      onEdit();
    }
  }

  return (
    <li key={item.href} className="user-profile-links__link">
      <a
        href={item.href}
        target='_blank'
        onClick={handleClick}
        title={canEdit ? 'Click to edit. Drag and drop to sort' : item.href}
      >
        <button className="button--blocked">
          {item.label}
        </button>
      </a>
    </li>
  )
}