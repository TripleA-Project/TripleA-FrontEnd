'use client';

import { Task, useParallelProgress } from '@/hooks/progress/useParallelProgress';
import { useContext } from 'react';
import ProgressContext, { ProgressContextState } from './Context';

export interface ProgressViewProps {
  taskList: Task[];
  onDone?: ProgressContextState['onDone'];
  onClose: () => void;
}

export interface ProgressIdleViewProps extends Pick<ProgressContextState, 'runTasks' | 'onClose'> {}
export interface ProgressWorkingViewProps
  extends Omit<ProgressContextState, 'runTasks' | 'taskStatus' | 'onDone' | 'onClose'> {}
export interface ProgressDoneViewProps extends Omit<ProgressContextState, 'runTasks' | 'taskStatus'> {}

function ProgressView({ taskList, onDone, onClose, children }: ProgressViewProps & { children: React.ReactNode[] }) {
  const { runTasks, ...progress } = useParallelProgress({
    taskList,
  });

  return (
    <ProgressContext.Provider value={{ runTasks, onDone, onClose, ...progress }}>{children}</ProgressContext.Provider>
  );
}

export default ProgressView;

ProgressView.Idle = function ProgressViewIdle({
  children,
}: {
  children: (props: ProgressIdleViewProps) => JSX.Element;
}) {
  const { taskStatus, runTasks, onClose } = useContext(ProgressContext);

  if (taskStatus !== 'idle') return null;

  return children({ runTasks, onClose });
};

ProgressView.Working = function ProgressViewWorking({
  children,
}: {
  children: (props: ProgressWorkingViewProps) => JSX.Element;
}) {
  const { taskStatus, runTasks, onDone, onClose, ...props } = useContext(ProgressContext);

  if (taskStatus !== 'working') return null;

  return children({ ...props });
};

ProgressView.Done = function ProgressViewDone({
  children,
}: {
  children: (props: ProgressDoneViewProps) => JSX.Element;
}) {
  const { taskStatus, runTasks, ...props } = useContext(ProgressContext);

  if (taskStatus !== 'done') return null;

  return children({ ...props });
};
