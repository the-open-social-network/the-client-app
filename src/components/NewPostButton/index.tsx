import { Composer } from '../Composer';
import IconWrite from '../Icons/IconWrite';
import './style.scss';
import { useState } from 'react';

export function NewPostButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className='button-primary button--blocked'
        onClick={() => setOpen(true)}
      >
        <IconWrite /> New Post
      </button>

      <Composer open={open} onClose={setOpen} />
    </>
  );
}