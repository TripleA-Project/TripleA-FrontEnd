import React from 'react';

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
  return (
    <div className="mr-[10px] flex h-[36px] items-center justify-center whitespace-nowrap rounded-full border border-gray-300 px-4 py-1 text-xs font-semibold text-gray-500">
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
