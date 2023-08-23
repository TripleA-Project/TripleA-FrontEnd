'use client';

// 에러 디버그를 위한 임시 조치

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex w-full justify-center">
      <div className="box-border rounded-xl border p-4">
        <h2>뉴스 상세페이지 에러</h2>
        <p className="mt-4 h-28 overflow-auto">{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
