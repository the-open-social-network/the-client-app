import "./style.scss";
import IconArrowLeft from "../../Icons/IconArrowLeft";

type ModalOverlapProps = {
  title?: string;
  noGoBackButton?: boolean;
  children?: React.ReactNode;
  onClose: Function;
}

export function ModalOverlap({ title, children, onClose, noGoBackButton }: ModalOverlapProps) {
  return (
    <div className="modal-overlap">
      <header className='modal-overlap__header'>
        {!noGoBackButton && (
          <button
            onClick={() => onClose()}
            className="button-brick button--small"
          >
            <IconArrowLeft />
          </button>
        )}

        <p className="h3">
          {title}
        </p>
      </header>
      
      <div className="modal-overlap__content">
        {children}
      </div>
    </div>
  )
}