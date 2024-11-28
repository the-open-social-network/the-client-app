import './style.scss';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import IconEmoji from '../Icons/IconEmoji'
import { useRef, useState } from 'react'
import { useClickAway } from '@/hooks/useClickAway';

export type EmojiData = {    
  id: string;
  keywords: string;
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
};

export type EmojiPickerProps = {
  disabled?: boolean;
  onPickEmoji: (data: EmojiData) => void;
};

export function EmojiPicker({ disabled, onPickEmoji }: EmojiPickerProps) {
  const $picker = useRef<HTMLDivElement>(null);
  const [ opened, setOpened ] = useState(false);

  useClickAway($picker, () => {
    setOpened(false);
  });

  return (
    <div className='emoji-picker' ref={$picker}>
      <button
        disabled={disabled}
        className="button-seamless"
        onClick={() => setOpened(true)}
      >
        <IconEmoji />
      </button>

      {opened && !disabled && (
        <div className="emoji-picker__panel">
          <Picker theme="light" data={data} onEmojiSelect={(item: EmojiData) => {
            onPickEmoji(item);
            setOpened(false);
          }} />
        </div>
      )}
    </div>
  )
}