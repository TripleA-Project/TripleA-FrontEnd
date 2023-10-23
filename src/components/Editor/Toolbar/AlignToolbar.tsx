'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ToolbarIcons } from './ToolbarIcons';
import { twMerge } from 'tailwind-merge';

type AlignToolbarNames = 'AlignLeft' | 'AlignCenter' | 'AlignRight';

function AlignToolbar() {
  const [editor] = useLexicalComposerContext();

  const buttonWrapperClassNames = {
    base: `shrink-0 p-1 align-top hover:bg-gray-100`,
    active: `bg-blue-50`,
    get AlignLeft() {
      return twMerge([this.base, true && this.active]);
    },
    get AlignCenter() {
      return twMerge([this.base], true && this.active);
    },
    get AlignRight() {
      return twMerge([this.base], true && this.active);
    },
  };

  const align = (e: React.MouseEvent, type: AlignToolbarNames) => {
    switch (type) {
      case 'AlignLeft':
        break;
      case 'AlignCenter':
        break;
      case 'AlignRight':
        break;
    }
  };

  return (
    <div className="inline-flex items-center gap-1 align-top">
      <button className={buttonWrapperClassNames.AlignLeft} onClick={(e) => align(e, 'AlignLeft')}>
        <ToolbarIcons.AlignLeft />
      </button>
      <button className={buttonWrapperClassNames.AlignCenter} onClick={(e) => align(e, 'AlignCenter')}>
        <ToolbarIcons.AlignCenter />
      </button>
      <button className={buttonWrapperClassNames.AlignRight} onClick={(e) => align(e, 'AlignRight')}>
        <ToolbarIcons.AlignRight />
      </button>
    </div>
  );
}

export default AlignToolbar;
