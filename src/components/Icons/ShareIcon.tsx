import { type IconProp } from '.';

export function ShareIcon(props: IconProp) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 11V17H17V11" stroke="#4E525D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11V3" stroke="#4E525D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 4L9 1L12 4" stroke="#4E525D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
