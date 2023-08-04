'use client';

interface NotificationDimProps {
  onClick?: (e: React.MouseEvent) => void;
  bottom?: number;
  dimHeight?: number;
}

function NotificationDim({ dimHeight, bottom, onClick }: NotificationDimProps) {
  const handleDimClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onClick) onClick(e);
  };

  return (
    <div
      style={{
        height: dimHeight ? `calc(100% - ${dimHeight}px)` : '100%',
        ...(bottom && { bottom }),
      }}
      className={`fixed bottom-0 left-0 right-0 z-[11] mx-auto box-border w-full max-w-screen-pc overflow-hidden backdrop-blur-sm mobile:min-w-[390px]`}
      onClick={handleDimClick}
    />
  );
}

export default NotificationDim;
