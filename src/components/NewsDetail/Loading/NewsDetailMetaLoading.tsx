import { NewsCardActionLoading } from '@/components/News/Card/NewsCardAction';

function NewsDetailMetaLoaing() {
  return (
    <section className="flex items-center justify-between">
      <section className="skeleton_loading">
        <span className="mr-0.5 inline-block h-4 w-10" />
        <span className="inline-block h-4 w-20" />
      </section>
      <NewsCardActionLoading />
    </section>
  );
}

export default NewsDetailMetaLoaing;
