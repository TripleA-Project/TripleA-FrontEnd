'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[300px] rounded-xl border-2 border-gray-400 px-4 py-4">
        <h2>에러로 인해 불편을 드려 죄송합니다.</h2>
        <p>잠시뒤 다시 시도해주세요</p>
        <button
          className="mt-4 flex items-center justify-center rounded-md bg-red-500 px-3 py-1"
          onClick={() => reset()}
        >
          reset
        </button>
      </div>
    </div>
  );
}
