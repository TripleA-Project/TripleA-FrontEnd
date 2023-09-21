'use client';

import { useLayoutEffect, useState } from 'react';
import { TimerWorkerCommand } from '@/interfaces/TimerWorker';

interface TimerProps extends React.HTMLProps<HTMLTimeElement> {
  minute: number;
}

let timerWorkerAPI: Worker | null = null;

function Timer({ minute, className, ...props }: TimerProps) {
  const [time, setTime] = useState(minute * 60);

  useLayoutEffect(() => {
    const timerWorker = new Worker('./timerWorker.js');
    timerWorkerAPI = timerWorker;

    timerInit(minute);
    timerStart();

    timerWorker.onmessage = (e) => {
      setTime(e.data.currentTime);
    };

    return () => {
      timerWorker.terminate();
    };
  }, []); /* eslint-disable-line */

  return (
    <time className={`${className}`} {...props}>
      {Math.floor(time / 60)}:{`${time % 60}`.padStart(2, '0')}
    </time>
  );
}

export function timerInit(minute: number) {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.INIT, payload: minute * 60 });
}

export function timerStart() {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.START });
}

export function timerReset() {
  timerWorkerAPI?.postMessage({ cmd: TimerWorkerCommand.RESET });
}

export default Timer;
