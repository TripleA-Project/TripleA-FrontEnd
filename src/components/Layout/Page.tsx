interface PageProps extends React.HTMLProps<HTMLElement> {
  children: React.ReactNode;
}

function Page({ children, ...props }: PageProps) {
  return (
    <main id="page_wrapper" className={`inner min-h-screen p-page`} {...props}>
      {children}
    </main>
  );
}

export default Page;
