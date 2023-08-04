import { type IconProp } from '.';

export function BackArrowGray(props: IconProp) {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_3827_37595)">
        <path
          d="M8.31906 6.17627L1.03906 13.4563L8.31906 20.7363"
          stroke="#9AA1A9"
          strokeWidth="2.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M1.03906 13.4565H17.6791" stroke="#9AA1A9" strokeWidth="2.08" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_3827_37595">
          <rect width="24" height="23.9909" fill="white" transform="translate(0 0.976074)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function NoBarBackArrowBlack(props: IconProp) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_3827_38440)">
        <path d="M10 3L1 12L10 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_3827_38440">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
