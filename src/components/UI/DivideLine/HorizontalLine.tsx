import { twMerge } from 'tailwind-merge';

interface HorizontalLineProps extends React.HTMLProps<HTMLHRElement> {}

function HorizontalLine({ className, ...props }: HorizontalLineProps) {
  const classNames = twMerge([`-mx-4 h-2 border-none bg-[#F5F7F9]`, className]);

  return <hr className={classNames} {...props} />;
}

export default HorizontalLine;
