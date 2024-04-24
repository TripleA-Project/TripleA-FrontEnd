'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { TimerWorkerCommand } from '@/interfaces/TimerWorker';
import { twMerge } from 'tailwind-merge';

interface TimerProps extends React.HTMLProps<HTMLTimeElement> {
  minute?: number;
  seconds?: number;
  autoStart?: boolean;
  loading?: boolean;
  onTimeEnd?: () => void;
}

let timerWorkerAPI: Worker | null = null;

function Timer({ minute, seconds, autoStart = true, loading, className, onTimeEnd, ...props }: TimerProps) {
  const [time, setTime] = useState(seconds ?? (minute ? minute * 60 : 300));

  const classNames = twMerge([className, loading && 'skeleton_loading']);

  useLayoutEffect(() => {
    const timerWorker = new Worker('/timerWorker.js');
    timerWorkerAPI = timerWorker;

    timerInit(seconds ?? (minute ? minute * 60 : 300));
    autoStart && timerStart();

    timerWorker.onmessage = (e) => {
      setTime(e.data.currentTime);
    };

    return () => {
      timerWorker.terminate();
    };
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if (time === 0 && onTimeEnd) {
      onTimeEnd();
    }
  }, [time]); /* eslint-disable-line */

  return (
    <time className={classNames} {...props}>
      {loading ? (
        <span className="block h-5 w-7 rounded-lg">&nbsp;</span>
      ) : (
        <span>{`${Math.floor(time / 60)}:${`${time % 60}`.padStart(2, '0')}`}</span>
      )}
    </time>
  );
}

export function timerInit(minute: number) {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.INIT, payload: minute * 60 });
}

export function timerInitSeconds(seconds: number) {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.INIT, payload: seconds });
}

export function timerStart() {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.START });
}

export function timerReset() {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.RESET });
}

export function timerStop() {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.STOP });
}

export default Timer;
