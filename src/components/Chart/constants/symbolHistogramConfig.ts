import {
  LineStyle,
  TrackingModeExitMode,
  type BarPrice,
  type ChartOptions,
  type DeepPartial,
  type HistogramSeriesOptions,
  type Time,
} from 'lightweight-charts';
import { getTimeMarker } from '@/util/chart';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';

export const getSymbolHistogramChartContainerOptions: (resample: ResampleFrequency) => DeepPartial<ChartOptions> = (
  resample,
) => ({
  layout: {
    textColor: '#9AA1A9',
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
      visible: false,
    },
    vertLine: {
      color: '#FC954A',
      labelVisible: false,
      visible: false,
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
    scaleMargins: {
      bottom: 0,
    },
  },
  autoSize: true,
});

export const getSymbolHistogramSeriesOptions: () => Partial<HistogramSeriesOptions> = () => ({
  priceLineVisible: false,
  lastValueVisible: false,
  priceFormat: { type: 'volume', precision: 0, minMove: 1 },
});
