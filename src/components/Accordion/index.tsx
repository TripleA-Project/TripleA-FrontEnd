'use client';

import Summary from './Summary';
import Detail from './Detail';
import { useState } from 'react';

interface AccordionProps {
  summary: React.ReactNode;
  detail: React.ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ summary, detail, defaultOpen = true }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpen = () => {
    console.log('click');
    setOpen((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      <Summary open={open} onClick={handleOpen}>
        {summary}
      </Summary>
      <Detail open={open}>{detail}</Detail>
    </div>
  );
}

export default Accordion;
