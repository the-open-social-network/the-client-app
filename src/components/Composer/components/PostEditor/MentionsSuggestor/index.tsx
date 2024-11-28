import './style.scss';
import { Avatar } from '../../../../Avatar';
import React, { useEffect, useRef, useState } from 'react';
import { IdentifierSchemaAttributes } from 'remirror';
import { MentionAtomNodeAttributes } from 'remirror/extensions';
import { useMentionAtom } from '@remirror/react';

const ALL_USERS = [
  { id: 'sue', label: '@sue', name: 'Sue Jones', avatar: 'https://placehold.co/400' },
  { id: 'pat', label: '@pat', name: 'Pat Smith', avatar: 'https://placehold.co/400' },
  { id: 'tom', label: '@tom', name: 'Tom Cruise', avatar: 'https://placehold.co/400' },
  { id: 'pas', label: '@pas', name: 'Pas Smith', avatar: 'https://placehold.co/400' },
  { id: 'jim', label: '@jim', name: 'Jim Carrey', avatar: 'https://placehold.co/400' },
];

export const mentionsAttributes: IdentifierSchemaAttributes[] = [
  {
    identifiers: ['mention'],
    attributes: {
      role: {
        default: 'presentation',
      }
    },
  },
  {
    identifiers: ['mention'],
    attributes: {
      href: {
        default: null
      }
    } 
  },
];

export function MentionSuggestor(): React.ReactElement<Element>|null {
  const $list = useRef(null);
  const [options, setOptions] = useState<MentionAtomNodeAttributes[]>([]);

  const {
    state,
    getMenuProps,
    getItemProps,
    indexIsHovered,
    indexIsSelected
  } = useMentionAtom({
    items: options
  });

  useEffect(() => {
    if (!state) {
      return;
    }

    const term = state.query.full.toLowerCase();

    const filteredOptions = ALL_USERS.filter((user) =>
      user.label.toLowerCase().includes(term),
    )
      .sort()
      .slice(0, 5);

    setOptions(filteredOptions);
  }, [state]);

  if (!Boolean(state) || !options?.length) {
    return null;
  }

  const at = document.querySelector('.post-editor .remirror-editor[contenteditable] .suggest-at');
  const pos = at?.getBoundingClientRect();

  return (
    <div 
      {...getMenuProps()}
      className='suggestions'
      style={{
        left: pos?.left,
        top: (pos?.top || 0) + 24,
      }}
    >
      <ul ref={$list}>
        {options.map((item, index) => {
          const isHighlighted = indexIsSelected(index);
          const isHovered = indexIsHovered(index);

          const classes = [
            'suggestion',
            isHovered && 'hovered',
            isHighlighted && 'highlighted',
          ].filter(Boolean).join(' ');
          
          const props = getItemProps({
            item,
            index,
          });

          return (
            <li
              key={item.id}
              className={classes}
              {...props}
            >
              <div className="suggestion__avatar">
                <Avatar size={40} src={item.avatar as string} alt="Mention profile pic"/>
              </div>

              <div className="suggestion__info">
                <div className="suggestion__info__name">
                  {item.name as string}
                </div>

                <div className="suggestion__info__handler">
                  {item.label}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};