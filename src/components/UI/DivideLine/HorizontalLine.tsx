interface HorizontalLineProps extends React.HTMLProps<HTMLHRElement> {}

function HorizontalLine(props: HorizontalLineProps) {
  return <hr className="-mx-4 h-2 border-none bg-[#F5F7F9]" {...props} />;
}

export default HorizontalLine;
