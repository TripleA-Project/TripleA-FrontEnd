'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Toolbar from './Toolbar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CleanupCommand } from '../../LexicalEditor';
import { IS_LINK_COMMAND } from '@/components/Editor/Toolbar';
import { $getNodeByKey, $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { flushSync } from 'react-dom';

type SubToolbarType = 'link' | 'nonActive';
interface SubToolbarPayload {
  link?: {
    url?: string;
    node: LinkNode | null;
  };
  image?: {
    width: number;
    height: number;
  };
}

export function SubToolbar() {
  const [editor] = useLexicalComposerContext();

  const linkURLInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<SubToolbarType>('nonActive');
  const [payload, setPayload] = useState<SubToolbarPayload>({
    link: {
      url: '',
      node: null,
    },
  });

  const EditorSubToolbar = useCallback(() => {
    switch (type) {
      case 'link':
        return (
          <Toolbar.GroupWrapper>
            <div>
              <label htmlFor="link-url" className="mr-2 text-xs font-bold text-[#1E1E1E]">
                링크 주소
              </label>
              <input
                ref={linkURLInputRef}
                id="link-url"
                placeholder="URL을 입력하세요"
                defaultValue={payload.link?.url ?? ''}
                spellCheck="false"
                className="box-border h-full w-52 border border-[#CACACA] px-1"
              />
            </div>
            <button
              className="hover:text-orange-400"
              title="링크 주소 수정"
              onClick={(e) => {
                if (!linkURLInputRef.current) return;
                if (!payload.link?.node) return;

                if (linkURLInputRef.current?.value === '') {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);

                  return;
                }

                if (linkURLInputRef.current.value && linkURLInputRef.current.value !== payload.link.url) {
                  editor.update(() => {
                    payload.link!.node!.setURL(linkURLInputRef.current!.value);
                  });
                }
              }}
            >
              <AiOutlineCheck />
            </button>
            <button
              className="hover:text-orange-400"
              title="링크 삭제"
              onClick={(e) => {
                if (!payload.link?.node) return;

                editor.update(() => {
                  payload.link!.node!.remove();
                });
              }}
            >
              <RiDeleteBin6Line />
            </button>
          </Toolbar.GroupWrapper>
        );
      default:
        return null;
    }
  }, [type]); /* eslint-disable-line */

  useEffect(() => {
    let cleanupLinkCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupLinkCommand = editor.registerCommand(
        IS_LINK_COMMAND,
        ({ active, nodeKey }) => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            const selectionNodes = selection.getNodes();

            const satisfiedLinkNode: LinkNode | null | undefined = selectionNodes
              .find((node) => $isLinkNode(node.getParent()))
              ?.getParent();

            setType(satisfiedLinkNode ? 'link' : 'nonActive');

            if (satisfiedLinkNode) {
              editor.getEditorState().read(() => {
                flushSync(() => {
                  setPayload((prev) => ({
                    ...prev,
                    link: {
                      url: satisfiedLinkNode.getURL(),
                      node: satisfiedLinkNode,
                    },
                  }));
                });
              });

              if (!active) {
                editor.dispatchCommand(IS_LINK_COMMAND, { active: true, nodeKey: satisfiedLinkNode.getKey() });
              }

              return false;
            }

            setPayload((prev) => ({
              ...prev,
              link: {
                url: '',
                node: null,
              },
            }));

            return false;
          }

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );
    }

    return () => {
      if (cleanupLinkCommand) {
        cleanupLinkCommand();
      }
    };
  }, [editor]);

  return (
    <Toolbar className={`h-[30px] px-1 py-0.5 shadow-sm ${type === 'nonActive' ? 'opacity-0' : 'opacity-100'}`}>
      <EditorSubToolbar />
    </Toolbar>
  );
}
