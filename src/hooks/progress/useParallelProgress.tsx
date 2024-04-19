'use client';

import { useCallback, useState } from 'react';

export type Task = () => Promise<any>;
export type TaskResults<R = any> = R[];
type TasksSet = Set<number>;
type ProgressStatus = 'idle' | 'working' | 'done';

interface ProgressState {
  totalTasks: TaskResults;
  endTaskSet: TasksSet;
  completedTaskSet: TasksSet;
  failTaskSet: TasksSet;
  status: ProgressStatus;
}

export interface UseParallelProgressReturn {
  totalTaskResult: TaskResults;
  endTaskResult: TaskResults;
  completedTaskResult: TaskResults;
  failTaskResult: TaskResults;
  taskStatus: ProgressStatus;
  runTasks: () => void;
}

interface UseParallelProgress {
  taskList: Task[];
  callback?: (args: { index: number; isSuccess: boolean }) => void;
}

export function useParallelProgress({ taskList, callback }: UseParallelProgress) {
  const [progressState, setProgressState] = useState<ProgressState>({
    totalTasks: Array.from({ length: taskList.length }).fill(null),
    endTaskSet: new Set(),
    completedTaskSet: new Set(),
    failTaskSet: new Set(),
    status: 'idle',
  });

  const runTasks = useCallback(() => {
    setProgressState((prev) => ({
      ...prev,
      status: 'working',
    }));

    setTimeout(() => {
      Promise.allSettled(
        taskList.map(async (task, index) => {
          try {
            const res = await task();

            setProgressState((prev) => {
              if (!prev.endTaskSet.has(index)) {
                if (callback) {
                  queueMicrotask(() => callback({ index, isSuccess: true }));
                }

                prev.totalTasks[index] = res;

                prev.endTaskSet.add(index);
                prev.completedTaskSet.add(index);
              }

              return {
                ...prev,
              };
            });
          } catch (error) {
            setProgressState((prev) => {
              if (!prev.endTaskSet.has(index)) {
                if (callback) {
                  queueMicrotask(() => callback({ index, isSuccess: false }));
                }

                prev.totalTasks[index] = error;

                prev.endTaskSet.add(index);
                prev.failTaskSet.add(index);
              }

              return {
                ...prev,
              };
            });
          }
        }),
      ).then(() => {
        setProgressState((prev) => ({
          ...prev,
          status: 'done',
        }));
      });
    }, 0);
  }, [taskList]); /* eslint-disable-line */

  return {
    totalTaskResult: progressState.totalTasks,
    endTaskResult: Array.from(progressState.endTaskSet).map((taskIndex) => progressState.totalTasks[taskIndex]),
    completedTaskResult: Array.from(progressState.completedTaskSet).map(
      (taskIndex) => progressState.totalTasks[taskIndex],
    ),
    failTaskResult: Array.from(progressState.failTaskSet).map((taskIndex) => progressState.totalTasks[taskIndex]),
    taskStatus: progressState.status,
    runTasks,
  } as UseParallelProgressReturn;
}
