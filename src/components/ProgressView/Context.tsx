import { UseParallelProgressReturn } from '@/hooks/progress/useParallelProgress';
import { createContext } from 'react';

export type ProgressContextState = UseParallelProgressReturn & {
  onDone?: (tasks: Pick<UseParallelProgressReturn, 'completedTaskResult' | 'failTaskResult'>) => void;
  onClose: () => void;
};

const ProgressContext = createContext<ProgressContextState>({
  totalTaskResult: [],
  runTasks: () => {},
  endTaskResult: [],
  failTaskResult: [],
  completedTaskResult: [],
  taskStatus: 'idle',
  onDone: undefined,
  onClose: () => {},
});

export default ProgressContext;
