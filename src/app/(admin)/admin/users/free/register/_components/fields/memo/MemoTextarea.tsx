'use client';

import { useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';

function MemoTextArea() {
  const { control } = useFormContext();
  const { field } = useController({ control, name: 'memo' });

  const id = useId();

  const fieldId = `${id}-${field.name}`;

  return (
    <div className="flex h-full w-full flex-col gap-y-0.5">
      <label htmlFor={fieldId} className="text-xs font-medium">
        메모
      </label>
      <textarea
        id={fieldId}
        className="w-full flex-1 resize-none border border-gray-300 p-2"
        onChange={field.onChange}
        value={field.value}
      />
    </div>
  );
}

export default MemoTextArea;
