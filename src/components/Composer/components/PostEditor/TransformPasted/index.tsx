import sanitizeHtml from 'sanitize-html';
import { Plugin, PluginKey } from 'prosemirror-state';

export const transformPaste = new Plugin({
  key: new PluginKey('transformPastedHTML'),
  props: {
    transformPastedHTML: slice => {
      return sanitizeHtml(slice, {
        parseStyleAttributes: false,
        allowedTags: [ 'p', 'span', 'br' ],
      }).replace(/\r?\n|\r/g, '<br/>');
    },
  }
});