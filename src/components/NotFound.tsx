export default function NotFound() {
  return (
    <div
      className="flex h-[70vh] flex-col items-center justify-center text-center"
      style={{
        fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
      }}
    >
      <div>
        <h1 className="my-0 ml-0 mr-5 inline-block border-r border-r-[#0000004d] py-0 pl-0 pr-[23px] align-top text-2xl font-medium leading-[49px]">
          404
        </h1>
        <div className="inline-block">
          <h2 className="m-0 text-sm font-normal leading-[49px]">This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}
