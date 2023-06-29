import {
  LineStyle,
  TrackingModeExitMode,
  type BarPrice,
  type ChartOptions,
  type DeepPartial,
  type LineSeriesOptions,
  type Time,
} from 'lightweight-charts';
import { getTimeMarker } from '@/util/chart';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';

export const getSymbolLineChartContainerOptions: (resample: ResampleFrequency) => DeepPartial<ChartOptions> = (
  resample: ResampleFrequency,
) => ({
  layout: {
    textColor: 'transparent',
  },
  trackingMode: {
    exitMode: TrackingModeExitMode.OnTouchEnd,
  },
  localization: {
    priceFormatter: (price: BarPrice) => {
      return Intl.NumberFormat('ko').format(Number(price.toFixed(0)));
    },
  },
  grid: {
    vertLines: { visible: false },
    horzLines: {
      style: LineStyle.Dashed,
      color: '#F2F2F2',
    },
  },
  crosshair: {
    horzLine: {
      color: '#9AA1A9',
      labelVisible: false,
    },
    vertLine: {
      color: '#FC954A',
      labelVisible: false,
      width: 1,
    },
  },
  timeScale: {
    tickMarkFormatter: (time: Time) => getTimeMarker(time, resample),
    visible: true,
    fixLeftEdge: true,
    fixRightEdge: true,
    borderVisible: false,
  },
  rightPriceScale: {
    borderVisible: false,
    textColor: '#9AA1A9',
  },
  autoSize: true,
});

export const getSymbolLineChartSeriesOptions: () => Partial<LineSeriesOptions> = () => ({
  color: 'red',
  priceLineVisible: false,
  lastValueVisible: false,
  crosshairMarkerVisible: false,
  priceFormat: {
    type: 'price',
    precision: 0,
    minMove: 1,
  },
});
