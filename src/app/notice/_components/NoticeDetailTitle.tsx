interface NoticeDetailTitleProps {
  title: string;
}

function NoticeDetailTitle({ title }: NoticeDetailTitleProps) {
  return <div className="flex w-full justify-center bg-white text-2xl font-bold">{title}</div>;
}

export default NoticeDetailTitle;
