import { type IconProp } from '..';

export function Profile2(props: IconProp) {
  return (
    <svg
      width="66"
      height="66"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g clipPath="url(#clip0_3836_41610)">
        <rect width="66" height="66" rx="33" fill="#50555C" />
        <rect width="66" height="66" fill="url(#pattern2)" />
      </g>
      <defs>
        <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_3836_41610" transform="translate(0 -0.000705219) scale(0.00141044)" />
        </pattern>
        <clipPath id="clip0_3836_41610">
          <rect width="66" height="66" rx="33" fill="white" />
        </clipPath>
        <image
          id="image0_3836_41610"
          width="709"
          height="710"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
