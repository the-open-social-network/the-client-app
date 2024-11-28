import IconImage from '../../../Icons/IconImage';
import IconCamera from '../../../Icons/IconCamera';
import IconGif from '../../../Icons/IconGif';
import IconArticle from '../../../Icons/IconArticle';
import { EmojiPicker, EmojiData } from '../../../EmojiPicker';
import IconModarate from '../../../Icons/IconModarate';
import { Moderation } from '../Moderation';
import { useState } from 'react';

type AttachmentsProps = {
  disabled?: boolean;
  onPickEmoji: (data: EmojiData) => void;
};

export function Attachements({ disabled, onPickEmoji }: AttachmentsProps) {
  const [openModeration, setOpenModeration] = useState(false);

  return (
    <>
      <ul>
        <li>
          <button
            disabled={disabled}
            className="button-brick button-ghost button--small"
          >
            <IconImage />
          </button>
        </li>

        <li>
          <button
            disabled={disabled}
            className="button-brick button-ghost button--small"
          >
            <IconCamera />
          </button>
        </li>

        <li>
          <button
            disabled={disabled}
            className="button-brick button-ghost button--small"
          >
            <IconGif />
          </button>
        </li>

        <li>
          <EmojiPicker
            disabled={disabled}
            onPickEmoji={onPickEmoji}
          />
        </li>

        <li>
          <button
            disabled={disabled}
            className="button-brick button-ghost button--small"
          >
            <IconArticle />
          </button>
        </li>   

        <li>
          <button
            disabled={disabled}
            onClick={() => setOpenModeration(true)}
            className="button-brick button-ghost button--small"
          >
            <IconModarate />
          </button>
        </li>        
      </ul>

      <Moderation
        open={openModeration}
        onClose={() => setOpenModeration(false)}
      />
    </>
  );
}