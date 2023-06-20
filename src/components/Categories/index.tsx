import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export function Categories({
  icon,
  label,
  percentage,
  color,
}: {
  icon: React.JSX.Element;
  label: string;
  percentage: string | null;
  color: string | null;
}) {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(label);

  return (
    <div
      className="flex h-[36px] items-center justify-center whitespace-nowrap rounded-full border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-500"
      style={{ backgroundColor: visible ? 'white' : 'gray' }}
    >
      {icon}
      {label}
      {percentage && color
        ? percentage && (
            <span className="ml-[5px]" style={{ color: color }}>
              {percentage}
            </span>
          )
        : null}
    </div>
  );
}
