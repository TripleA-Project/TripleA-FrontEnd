import { LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useEffect, useRef } from 'react';
import Toolbar from '../Toolbar';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IS_LINK_COMMAND } from '@/components/Editor/Toolbar';

interface LinkSubToolbarProps {
  url: string;
  node: LinkNode;
}

export function LinkSubToolbar({ url, node }: LinkSubToolbarProps) {
  const [editor] = useLexicalComposerContext();

  const linkURLInputRef = useRef<HTMLInputElement>(null);

  const updateURL = (e: React.MouseEvent) => {
    if (!linkURLInputRef.current) return;

    if (linkURLInputRef.current?.value === '') {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);

      return;
    }

    if (linkURLInputRef.current.value && linkURLInputRef.current.value !== url) {
      editor.update(() => {
        node.setURL(linkURLInputRef.current!.value);
      });
    }
  };

  const remove = (e: React.MouseEvent) => {
    editor.update(() => {
      node.remove();
      //editor.dispatchCommand(IS_LINK_COMMAND, { active: false });
    });
  };

  // useEffect(() => {
  //   return () => {
  //     editor.dispatchCommand(IS_LINK_COMMAND, { active: false });
  //   };
  // }, [editor]);

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
          defaultValue={url ?? ''}
          spellCheck="false"
          className="box-border h-full w-52 border border-[#CACACA] px-1"
        />
      </div>
      <button className="hover:text-orange-400" title="링크 주소 수정" onClick={updateURL}>
        <AiOutlineCheck />
      </button>
      <button className="hover:text-orange-400" title="링크 삭제" onClick={remove}>
        <RiDeleteBin6Line />
      </button>
    </Toolbar.GroupWrapper>
  );
}
