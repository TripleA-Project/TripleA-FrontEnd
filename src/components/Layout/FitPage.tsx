interface FitPageProps extends React.HTMLProps<HTMLDivElement> {
  path?: string;
  children: React.ReactNode;
}

function FitPage({ path, className, children, ...props }: FitPageProps) {
  if (path === 'newsHome') {
    <div className={`h-[calc(100vh-195px)] w-full ${className ?? ''}`} {...props}>
      {children}
    </div>;
  }

  if (path === 'chartHome') {
    return (
      <div className={`h-[calc(100vh-155px)] w-full ${className ?? ''}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={`h-[calc(100vh-115px)] w-full ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
}

export default FitPage;
