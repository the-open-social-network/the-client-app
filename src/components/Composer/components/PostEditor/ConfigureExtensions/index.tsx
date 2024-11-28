import { MentionExtension, MentionAtomExtension, PlaceholderExtension } from 'remirror/extensions';
import { BidiExtension } from '@remirror/extension-bidi';
import { DropCursorExtension } from '@remirror/extension-drop-cursor';
import { GapCursorExtension } from '@remirror/extension-gap-cursor';
import { HardBreakExtension } from '@remirror/extension-hard-break';
import { LinkExtension } from '@remirror/extension-link';
import { ShortcutsExtension } from '@remirror/extension-shortcuts';
import { TrailingNodeExtension } from '@remirror/extension-trailing-node';

export type ExtensionsConfig =
  | GapCursorExtension
  | HardBreakExtension
  | LinkExtension
  | BidiExtension
  | DropCursorExtension
  | TrailingNodeExtension
  | ShortcutsExtension
  | MentionAtomExtension
  | MentionExtension
  | PlaceholderExtension;

export function configureExtentions({ placeholder }: Partial<{ placeholder: string }> = {}): ExtensionsConfig[] {
  return [
    new PlaceholderExtension({ placeholder }),
    new GapCursorExtension(),
    new HardBreakExtension(),
    new ShortcutsExtension(),
    new BidiExtension(),
    new DropCursorExtension(),
    new TrailingNodeExtension(),
    new LinkExtension({
      autoLink: true,
      extractHref: () => 'javascript:void(0)',
      autoLinkRegex: /(#[^\s]+)|(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?:[\da-z\u00A1-\uFFFF][\w\u00A1-\uFFFF-]{0,62})?[\da-z\u00A1-\uFFFF]\.)*(?:(?:\d(?!\.)|[a-z\u00A1-\uFFFF])(?:[\da-z\u00A1-\uFFFF][\w\u00A1-\uFFFF-]{0,62})?[\da-z\u00A1-\uFFFF]\.)+[a-z\u00A1-\uFFFF]{2,}(?::\d{2,5})?(?:[#/?]\S*)?/gi
    }),
    new MentionAtomExtension({
      mentionTag: 'em',
      suggestTag: 'em',
      matchers: [
        { name: 'at', char: '@', },
      ],
    }),
  ];
}
