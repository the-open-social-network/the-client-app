'use client';

import './style.scss';
import { Modal } from "../Modal";
import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import IconClose from '../Icons/IconClose';
import { Attachements } from './components/Attachments';
import { PostEditor, PostEditorController } from './components/PostEditor';
import { Spinner } from '../Spinner';
import { useKeyDown } from '../../hooks/useKeyDown';
import { PostLength } from './components/PostLength';
import { graphemeLength } from '../../toolbox/grapheme-length';
import { MAX_POST_LENGTH } from '../../toolbox/constants';
import { ConfirmClose } from './components/ConfirmClose';
import { PostContextProvider } from './contexts/post-context';

type ComposerProps = {
  open?: boolean;
  onClose: Function;
};

export function Composer({open, onClose}: ComposerProps) {
  const [loading, setLoading] = useState(false);
  const [postLen, setPostLen] = useState(0);
  const [confirmClose, setConfirmClose] = useState(false);
  const [editor, setEditor] = useState<PostEditorController>();

  const getPostText = () => {
    return editor?.manager.view.dom.innerText.trim() || '';
  }

  const handleSubmit = async () => {
    if (!open || loading || postLen > MAX_POST_LENGTH) {
      return;
    }

    try {
      const content = getPostText();

      if (!content) {
        toast.warn('Your post is empty', {
          transition: Flip,
          hideProgressBar: true,
        });
        return;
      }

      setLoading(true);
    } catch(error) {
      toast.error('Sorry, something went very wrong with ours servers. Please try again in a couple seconds');
      setLoading(false);
    }
  };

  const handleChange = () => {
    const content = getPostText();
    setPostLen(graphemeLength(content));
  }

  const handleClose = () => {
    if (!open || loading) {
      return false;
    }

    postLen
      ? setConfirmClose(true)
      : onClose();
  }

  useKeyDown({
    Enter: (e: KeyboardEvent) => {
      if (e.metaKey) {        
        handleSubmit();
      }
    }
  })

  useEffect(() => {
    if (open) {
      setLoading(false);
    }
  }, [open]);

  return (
    <PostContextProvider>
      <Modal
        open={open}
        persist={false}
        dropOnBody={true}
        onClose={handleClose}
        preventCloseOnBackdropClick={true}
      >
        <div className="composer">
          <header>
            <div className="composer__header__left">
              {loading ? (
                <Spinner size="sm" color="#000" />
              ) : (
                <button
                  onClick={handleSubmit}
                  data-loading={loading}
                  className='button-primary'
                  disabled={loading || postLen > MAX_POST_LENGTH}
                >
                  Post
                </button>
              )}
            </div>

            <div className="composer__header__right">
              <button
                disabled={loading}
                onClick={() => handleClose()}
                className="button-brick button--danger button--small"
              >
                <IconClose />
              </button>
            </div>
          </header>

          <div className="composer__editor">
            <PostEditor
              autoFocus={true}
              editable={!loading}
              onCreate={setEditor}
              onChange={handleChange}
              placeholder="What's up?"
            />
          </div>

          <footer>
            <div className="composer__footer__left">
              <Attachements
                disabled={loading}
                onPickEmoji={item => {
                  try {
                    if (loading) {
                      return;
                    }

                    const emoji = item.native;
                    const view = editor?.manager?.view;
                    const selection = view?.state.selection;
    
                    if (view && selection) {
                      view.focus();
                      view.dispatch(editor.manager.tr.insertText(emoji, selection.from, selection.to));
                    }
                  } catch(error) {
                    console.error(error);
                  }
                }}
              />
            </div>

            <div className="composer__footer__right">
              <PostLength value={postLen} max={MAX_POST_LENGTH}/>
            </div>
          </footer>
        </div>
      </Modal>

      <ConfirmClose
        open={confirmClose}
        onCancel={() => setConfirmClose(false)}
        onConfirm={() => {
          setConfirmClose(false);
          onClose()
        }}
      />
    </PostContextProvider>
  )
}