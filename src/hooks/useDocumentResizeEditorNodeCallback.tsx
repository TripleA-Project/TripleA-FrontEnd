'use client';

import { useCallback, useLayoutEffect } from 'react';
import { LexicalEditor, LexicalNode } from 'lexical';
import { throttle } from 'lodash';
import { useFindByLexicalEditor } from './useFindLexicalEditor';

type ResizeCallbackMap = {
  Key: string;
  Value: () => void;
};
type Callback<T extends LexicalNode> = (node: T) => void;

interface UseDocumentResize {
  nodeKey: string;
  editor: LexicalEditor;
  throttleTime?: number;
}

let isRegisteredWindowResizeEvent = false;
const eventMap: Map<ResizeCallbackMap['Key'], ResizeCallbackMap['Value']> = new Map();

export function useDocumentResizeEditorNodeCallback<T extends LexicalNode = LexicalNode>({
  nodeKey,
  editor,
  throttleTime,
}: UseDocumentResize) {
  const { findNodeByKey } = useFindByLexicalEditor({ editor });

  const throttleMilliSecond = initThrottleTime(throttleTime);

  const registerCallback = useCallback((callback: Callback<T>) => {
    const handleCallback = () => {
      const targetNode = findNodeByKey<T>(nodeKey).node;

      if (targetNode) {
        callback(targetNode);
      }
    };

    const throttleHandleCallback = throttle(handleCallback, throttleMilliSecond);

    eventMap.set(nodeKey, throttleHandleCallback);
  }, []); /* eslint-disable-line */

  const unregisterCallback = useCallback((key: ResizeCallbackMap['Key']) => {
    eventMap.delete(key);
  }, []);

  function initThrottleTime(throttleTime?: number) {
    const THROTTLE_MilliSecond = 300; /* 300ms */

    if (!throttleTime || throttleTime <= 0) {
      return THROTTLE_MilliSecond;
    }

    return throttleTime;
  }

  useLayoutEffect(() => {
    const handleResize = (e: UIEvent) => {
      for (const handleCallback of Array.from(eventMap.values())) {
        handleCallback();
      }
    };

    if (!isRegisteredWindowResizeEvent) {
      window.addEventListener('resize', handleResize);
      isRegisteredWindowResizeEvent = true;
    }

    return () => {
      unregisterCallback(nodeKey);

      if (!eventMap.size) {
        window.removeEventListener('resize', handleResize);
        isRegisteredWindowResizeEvent = false;
      }
    };
  }, []); /* eslint-disable-line */

  return {
    registerCallback,
  };
}
