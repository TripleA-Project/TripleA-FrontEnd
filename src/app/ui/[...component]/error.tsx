'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ComponentList } from '@/components/ComponentTest';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const params = useParams();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2>컴포넌트 경로를 재확인해보세요</h2>
      <div>
        <p>
          현재 입력한 컴포넌트 이름 : <span className="font-bold">{params.component}</span>
        </p>
        <p className="">현재 등록된 컴포넌트 이름 :</p>
        <div className="flex w-full flex-wrap gap-4">
          {Object.keys(ComponentList).map((name) => (
            <span key={name} className="max-w-full break-words break-all rounded-lg bg-gray-300 p-1">
              {name}
            </span>
          ))}
        </div>
      </div>

      <button
        className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-700"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
