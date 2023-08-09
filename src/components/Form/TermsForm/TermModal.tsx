'use client';

import { createPortal } from 'react-dom';
import { TfiClose } from 'react-icons/tfi';

interface TermModalProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

function TermModal({ title, className, children, onClose }: TermModalProps) {
  return createPortal(
    <div className="fixed_inner fixed top-0 z-10 h-[calc(100vh-63px)] overflow-auto bg-white scrollbar-thin">
      <div className="sticky top-0 flex flex-col justify-center gap-5 bg-white px-4 pt-5">
        <TfiClose
          role="button"
          className="shrink-0 self-end"
          onClick={() => {
            if (onClose) onClose();
          }}
        />
        <section>
          <h2 className="text-lg font-bold">{title}</h2>
          <hr className="mb-9 mt-3.5 border-b-[3px] border-b-black" />
        </section>
      </div>
      <div className={`box-border px-4 ${className ?? ''}`}>{children}</div>
    </div>,
    document.body,
  );
}

export default TermModal;
