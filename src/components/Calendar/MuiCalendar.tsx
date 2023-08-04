'use client';

import { useRef, useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';
import { Days, Kor_Days } from '@/constants/calendar';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

interface ChangeDatePayload extends CalenderDate {
  isRangeSelected: boolean;
}

export interface CalenderDate {
  selectedDate: Dayjs | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface MuiCalendarProps {
  disabled?: boolean;
  activeRangeSelect?: boolean;
  onChangeDate?: ({ startDate, endDate, isRangeSelected }: ChangeDatePayload) => void;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ day, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    border: 'none !important',
    backgroundColor: '#FD954A !important',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#FD954A',
      position: 'relative',
      '&::before': {
        position: 'absolute',
        left: '0',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        content: `"${day.format('D')}"`,
        background: '#d96416',
      },
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '5px !important',
    borderBottomLeftRadius: '5px !important',
    borderTopRightRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
    margin: '0 !important',
    backgroundColor: '#FD954A !important',
    color: '#fff !important',
    fontWeight: 'bold !important',
    '&:hover': {
      position: 'relative',
      background: '#FD954A !important',
      '&::before': {
        position: 'absolute',
        left: '0',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        content: `"${day.format('D')}"`,
        background: '#d96416',
      },
    },
  }),
  ...(isLastDay && {
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    border: 'none !important',
    color: '#fff !important',
    fontWeight: 'bold !important',
    '&:focus': {
      background: '#FD954A',
    },
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedDate: Dayjs | null;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  },
) {
  const { day, selectedDate, startDate, endDate, sx, ...other } = props;

  if (startDate == null || endDate == null) {
    return (
      <PickersDay
        day={day}
        sx={{
          color: '#000',
          fontWeight: 'bold',
          '&.Mui-selected': {
            borderRadius: '5px',
            fontWeight: 'bold',
          },
          '&.Mui-selected:focus': {
            background: '#FD954A',
          },
          '&[aria-selected="true"]': {
            background: 'orange',
            '&:hover': {
              background: '#d96416',
            },
          },
          '&[aria-current="date"]': {
            border: 'none',
          },
        }}
        {...other}
      />
    );
  }

  const dayIsBetween = day.isBetween(startDate, endDate, null, '[]');
  const isFirstDay = startDate && endDate && day.isSame(startDate, 'day');
  const isLastDay = startDate && endDate && day.isSame(endDate, 'day');

  return (
    // @ts-ignore
    <CustomPickersDay
      {...other}
      day={day}
      sx={dayIsBetween ? { px: 2.5, mx: 0 } : { color: '#000', fontWeight: 'bold' }}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
  );
}

function MuiCalendar({ onChangeDate, activeRangeSelect = true, disabled = false }: MuiCalendarProps) {
  const [date, setDate] = useState<CalenderDate>({
    selectedDate: dayjs(),
    startDate: dayjs(),
    endDate: null,
  });

  const rangeSelectedRef = useRef<boolean>(false);

  useEffect(() => {
    onChangeDate &&
      onChangeDate({
        selectedDate: date.selectedDate,
        startDate: date.startDate,
        endDate: date.endDate,
        isRangeSelected: rangeSelectedRef.current,
      });
  }, [date]); /* eslint-disable-line */

  return (
    <>
      <div className="relative z-[4] mx-auto w-80">
        <div className="flex items-center justify-center">
          <MonthSelect
            disabled={disabled}
            onMonthselect={({ month }) => {
              setDate((prev) => {
                const targetDate = dayjs(date.selectedDate).set('month', month);

                rangeSelectedRef.current = false;

                return {
                  ...prev,
                  selectedDate: targetDate,
                  startDate: targetDate,
                  endDate: null,
                };
              });
            }}
          />
          <YearSelect
            disabled={disabled}
            onYearselect={(year) => {
              const targetDate = dayjs(date.selectedDate).set('year', year);

              rangeSelectedRef.current = false;

              setDate((prev) => ({
                ...prev,
                selectedDate: targetDate,
                startDate: targetDate,
                endDate: null,
              }));
            }}
          />
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disabled={disabled}
          value={date.selectedDate}
          onChange={(targetDate) => {
            if (!activeRangeSelect) {
              setDate((prev) => ({ ...prev, selectedDate: targetDate, startDate: null, endDate: null }));

              return;
            }

            if (rangeSelectedRef.current === true) {
              setDate((prev) => ({ ...prev, selectedDate: targetDate, startDate: targetDate, endDate: null }));

              rangeSelectedRef.current = false;

              return;
            }

            if (rangeSelectedRef.current === false) {
              if (targetDate?.format('YYYY-MM-DD') === date.startDate?.format('YYYY-MM-DD')) return;

              if (targetDate?.isBefore(date.startDate)) {
                setDate((prev) => ({ ...prev, selectedDate: targetDate, startDate: targetDate, endDate: null }));

                return;
              }

              setDate((prev) => ({ ...prev, selectedDate: targetDate, endDate: targetDate }));

              rangeSelectedRef.current = true;

              return;
            }
          }}
          dayOfWeekFormatter={(targetDay) => {
            return Kor_Days[Days.findIndex((day) => day === targetDay)];
          }}
          shouldDisableYear={(year) => {
            const MinYear = 2023;

            const targetYear = dayjs(year).get('year');
            const currentYear = dayjs().get('year');

            return targetYear > currentYear || targetYear < MinYear;
          }}
          slots={{ day: Day as any }}
          slotProps={{
            day: {
              selectedDate: date.selectedDate,
              startDate: date.startDate,
              endDate: date.endDate,
            } as any,
          }}
          sx={{
            '& .MuiPickersCalendarHeader-root': {
              display: 'none',
            },
            '& .MuiDayCalendar-header > span': {
              color: '#252525',
            },
          }}
          disableHighlightToday={true}
          reduceAnimations={true}
        />
      </LocalizationProvider>
    </>
  );
}

export default MuiCalendar;
