import { getFromLocalStorage, setInLocalStorage } from '@/helpers/localStorage';
import { useState } from 'react';

type IfString<T, K, L> = T extends string ? K : L;
type Transformer<T> = {
  toString: (t: T) => string;
  fromString: (s: string) => T;
};

function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
  transformer?: IfString<T, never, Transformer<T>>,
) {
  const [state, setState] = useState<T | undefined>(() => {
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        setInLocalStorage(key, defaultValue);
        return defaultValue;
      }

      if (!transformer?.toString) {
        throw new Error(
          `Given defaultValue is not a string and no transformer is given. defaultValue=${defaultValue}`,
        );
      }

      const transformed = transformer.toString(defaultValue);

      setInLocalStorage(key, transformed);
      return defaultValue;
    }

    const recoveredValue = getFromLocalStorage(key);

    if (recoveredValue === undefined) {
      return;
    }

    if (transformer?.fromString) {
      return transformer?.fromString(recoveredValue);
    }

    return recoveredValue as T;
  });

  const set = (t: T) => {
    setState(t);
    setInLocalStorage(key, transformer?.toString(t) ?? (t as string));
  };

  return [state, set];
}

export default useLocalStorage;
