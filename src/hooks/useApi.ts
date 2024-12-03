import api from '@/services/api';
import type { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useGet<T>(
  endpoint: string,
  config: AxiosRequestConfig = {},
): [T | undefined, () => void] {
  // A state to store remote resource and response status
  const [state, setState] = useState<T | undefined>(undefined);

  // Abort controller
  const [controller, setController] = useState(new AbortController());

  // A state to trigger the side effect which then itself causes fetching remote resource
  const [executionFlag, setExecutionFlag] = useState(false);
  const execute = useCallback(() => setExecutionFlag((f) => !f), []);

  useEffect(() => {
    // Abort previous flying request
    controller.abort();

    // Prepare a new abort controller for the new request
    const newController = new AbortController();
    setController(newController);

    api
      .get<T>(endpoint, {
        ...config,
        // Connect the new abort controller
        signal: newController.signal,
      })
      .then((response) => {
        setState(response.data);
      });

    // Cleanup function to prevent race condition
    return () => newController.abort();
  }, [executionFlag]);

  return [state, execute];
}
