import './style.scss';
import { Extension } from 'remirror';
import { i18nFormat } from '@remirror/i18n';
import { transformPaste } from './TransformPasted';
import type { AnyExtension, CreateEditorStateProps, RemirrorEventListener } from 'remirror';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import { MentionSuggestor, mentionsAttributes } from './MentionsSuggestor';
import { ExtensionsConfig, configureExtentions } from './ConfigureExtensions';
import type { ReactExtensions, RemirrorProps, UseRemirrorReturn, UseThemeProps } from '@remirror/react';
import { Plugin } from '@remirror/pm/state';

export type PostEditorController = UseRemirrorReturn<ReactExtensions<ExtensionsConfig>>;

export interface EditorProps extends 
  Pick<CreateEditorStateProps, 'stringHandler'>,
  Pick<
    RemirrorProps,
    | 'initialContent'
    | 'editable'
    | 'autoFocus'
    | 'hooks'
    | 'i18nFormat'
    | 'locale'
    | 'supportedLocales'
  > {
    onCreate?: Function;
    onChange?: RemirrorEventListener<AnyExtension> | undefined;
    placeholder?: string;
    theme?: UseThemeProps['theme'];
  }

export function PostEditor(props: PropsWithChildren<EditorProps>): React.ReactElement<RemirrorProps<Extension>> {
  const extensions = useCallback(() => configureExtentions({
    placeholder: props.placeholder
  }), []);

  const editor = useRemirror({
    extensions,

    plugins: [
      transformPaste,
      new Plugin({
        props: {
          handleKeyDown(_view, event) {
            // prevents Mod+Enter from adding a new line
            if (event.metaKey && event.key === 'Enter') {
              return true;
            }
          },
        },
      }),
    ],

    extraAttributes: [
      ...mentionsAttributes
    ],
  });

  useEffect(() => {
    if (props.onCreate) {
      props.onCreate(editor as PostEditorController);
    }
  }, []);

  return (
    <div className='post-editor'>
      <Remirror
        onChange={props.onChange}
        manager={editor.manager}
        i18nFormat={i18nFormat}
        {...props}
      >
        <EditorComponent />
        <MentionSuggestor />
      </Remirror>
    </div>
  );
};