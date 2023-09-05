import React from 'react';

function AvatarLoading() {
  return (
    <div className="skeleton_loading inline-flex">
      <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-full" />
    </div>
  );
}

export default AvatarLoading;
