import { createContext } from 'react';
import { UseParallelProgressReturn } from './useParallelProgress';

export type ProgressContextState = UseParallelProgressReturn & { onDone: () => void; onClose: () => void };

const ProgressContext = createContext<ProgressContextState>({
  totalTaskResult: [],
  runTasks: () => {},
  endTaskResult: [],
  failTaskResult: [],
  completedTaskResult: [],
  taskStatus: 'idle',
  onDone: () => {},
  onClose: () => {},
});

export default ProgressContext;
