interface PageProps extends React.HTMLProps<HTMLElement> {
  children: React.ReactNode;
}

function Page({ children, ...props }: PageProps) {
  return (
    <main
      id="page_wrapper"
      className={`mx-auto box-border min-h-screen max-w-screen-pc p-page mobile:min-w-[390px]`}
      {...props}
    >
      {children}
    </main>
  );
}

export default Page;
