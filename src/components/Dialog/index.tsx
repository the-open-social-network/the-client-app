import './style.scss';
import { Modal } from "../Modal";

type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: Function;
  confirmationColor?: string;
  confirmationLabel?: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Dialog({
  open,
  title,
  description,
  confirmationLabel,
  confirmationColor,
  onConfirm,
  onCancel,
  onClose
}: DialogProps) {
  if (!open) {
    return  null;
  }

  return (
    <Modal
      open={open}
      centered={true}
      onClose={onClose}
      dropOnBody={true}
    >
      <div className="dialog">
        <header>
            <p className="h2">
              <strong>
                {title}
              </strong>
            </p>

          <p>{description}</p>
        </header>

        <div className="dialog__actions">
          <button
            onClick={onCancel}
            className='button-light button--blocked'
          >
            Cancel
          </button>

          <button 
            className='button-primary button--blocked'
            onClick={onConfirm}
            style={{
              backgroundColor: confirmationColor || '#000'
            }}
          >
            {confirmationLabel || 'Ok'}
          </button>
        </div>
      </div>
    </Modal>
  );
}