'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const params = useParams();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h2>컴포넌트 경로를 재확인해보세요</h2>
      <p>현재 입력한 경로 : @/components/{params.component}</p>
      <button
        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
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
