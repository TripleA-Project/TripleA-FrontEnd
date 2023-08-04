import { type IconProp } from '.';

export function BookmarkFill(props: IconProp) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="#000000" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.800781 1.59961H15.2008V18.3996L8.00078 14.7996L0.800781 18.3996V1.59961Z"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookmarkNoFill(props: IconProp) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.800781 1.59961H15.2008V18.3996L8.00078 14.7996L0.800781 18.3996V1.59961Z"
        stroke="#4E525D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
