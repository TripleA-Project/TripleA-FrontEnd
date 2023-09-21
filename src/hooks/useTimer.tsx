'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { TimerWorkerCommand } from '@/interfaces/TimerWorker';

interface TimerFormat {
  hour?: number;
  minute?: number;
  second?: number;
}

interface UseTimerOption {
  initialTime?: TimerFormat;
}

function serializeTimeFormat(time: TimerFormat) {
  const hour = time.hour ?? 0;
  const minute = time.minute ?? 0;
  const second = time.second ?? 0;

  return hour * 3600 + minute * 60 + second;
}

export function useTimer(
  { initialTime = { hour: 0, minute: 1, second: 0 } }: UseTimerOption = {
    initialTime: { hour: 0, minute: 1, second: 0 },
  },
) {
  const timerWorkerRef = useRef<Worker | null>(null);
  const [time, setTime] = useState(serializeTimeFormat(initialTime));

  const timerStart = () => {
    timerWorkerRef.current?.postMessage({ cmd: TimerWorkerCommand.START });
  };

  const timerReset = () => {
    timerWorkerRef.current?.postMessage({ cmd: TimerWorkerCommand.RESET });
  };

  const timerStop = () => {
    timerWorkerRef.current?.postMessage({ cmd: TimerWorkerCommand.STOP });
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if (!timerWorkerRef.current) {
      timerWorkerRef.current = new Worker(location.origin + '/timerWorker.js');

      timerWorkerRef.current.onmessage = (e) => {
        setTime(e.data.currentTime);
      };
      timerWorkerRef.current.postMessage({ cmd: TimerWorkerCommand.INIT, payload: time });
    }

    return () => {
      if (timerWorkerRef.current) {
        timerWorkerRef.current.terminate();
      }

      timerWorkerRef.current = null;
    };
  }, []); /* eslint-disable-line */

  return {
    time,
    timerStart,
    timerReset,
    timerStop,
  };
}
