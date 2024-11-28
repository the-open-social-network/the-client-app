import { Dialog } from "../../../Dialog";

type ConfirmCloseProps = {
  open: boolean;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

export function ConfirmClose({ open, onCancel, onConfirm }: ConfirmCloseProps) {
  return (
    <Dialog
      open={open}
      title="Discard draft?"
      confirmationColor='#e74c3c'
      confirmationLabel='Discard'
      description="Are you sure you'd like to discard this draft?"
      onClose={onCancel}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}