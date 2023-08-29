interface FitPageProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

function FitPage({ className, children, ...props }: FitPageProps) {
  return (
    <div className={`h-[calc(100vh-115px)] w-full ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
}

export default FitPage;
