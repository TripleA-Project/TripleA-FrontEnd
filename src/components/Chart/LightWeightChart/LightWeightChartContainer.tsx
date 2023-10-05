'use client';

interface ChartContainerProps {
  children: React.ReactNode;
}

function LightWeightChartContainer({ children }: ChartContainerProps) {
  return <>{children}</>;
}

export default LightWeightChartContainer;
