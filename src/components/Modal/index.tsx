import './style.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useKeyDown } from '../../hooks/useKeyDown';
import IconClose from '../Icons/IconClose';

type ModalProps = {
  open?: boolean;
  persist?: boolean;
  onClose: Function;
  centered?: boolean;
  lightbox?: boolean;
  stickedFooter?: boolean;
  lightboxWidth?: number;
  dropOnBody?: boolean;
  noHeaderCloseBtn?: boolean;
  children: React.ReactNode;
  portal?: HTMLElement | string;
  preventCloseOnEscape?: boolean;
  title?: string|React.ReactNode;
  preventCloseOnBackdropClick?: boolean;
};

export function Modal({
  children,
  open,
  portal,
  dropOnBody,
  title,
  centered,
  onClose,
  persist,
  lightbox,
  stickedFooter,
  lightboxWidth, 
  noHeaderCloseBtn,
  preventCloseOnEscape,
  preventCloseOnBackdropClick
}: ModalProps) {
  const portalTarget = dropOnBody
    ? (typeof document !== typeof undefined ? document.body : undefined)
    : (typeof portal === 'string' ? document.querySelector(portal) : portal);

  useKeyDown({
    Escape: () => {
      if (!preventCloseOnEscape) {
        onClose();
      }
    }
  });

  useEffect(() => {
    if (open) {
      document.body.dataset.modalOpened = 'true';
    } else {
      document.body.removeAttribute('data-modal-opened');
    }

    return () => document.body.removeAttribute('data-modal-opened');
  });

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    const backdropStrictClick = (e.target as HTMLElement).tagName.toLowerCase() === 'dialog';

    if (!preventCloseOnBackdropClick && backdropStrictClick) {
      onClose(false);
    }
  };

  const dialog = (
    <dialog
      open={open}
      onClick={onBackdropClick}
      className={`modal modal--centered-${centered} modal--lightbox-${lightbox} modal--sticked-footer-${stickedFooter}`}
    >
      {lightbox ? (
        <div className='modal__lightbox' style={{ maxWidth: lightboxWidth || 568 }}>
          <header className='modal__header'>
            <p className="h3">{title}</p>

            {!noHeaderCloseBtn && (
              <button
                onClick={() => onClose()}
                className="button-brick button--small button--danger"
              >
                <IconClose />
              </button>
            )}
          </header>

          {children}
        </div>
      ) : (
        children
      )}
    </dialog>
  );

  if (!open && !persist) {
    return null;
  }

  if (portalTarget) {
    return createPortal(dialog, portalTarget);
  }

  return dialog;
}
