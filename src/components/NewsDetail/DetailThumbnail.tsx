import NewsThumbnail, { NewsThumbnailLoading } from '../Image/NewsThumbnail';

interface DetailThumbnailProps {
  src?: string;
}

function DetailThumbnail({ src }: DetailThumbnailProps) {
  return (
    <NewsThumbnail
      src={src}
      className={'mx-auto aspect-[16/10] !h-auto !w-full max-w-2xl !rounded-none'}
      fit="scale-down"
    />
  );
}

export default DetailThumbnail;
