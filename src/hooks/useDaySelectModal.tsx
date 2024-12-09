import { PropsWithChildren, createContext, useContext, useState } from 'react';

type ContextValue = {
  state: boolean;
};

const DaySelectContext = createContext<ContextValue | undefined>(undefined);

function DaySelectModalProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(false);

  return (
    <DaySelectContext.Provider value={{ state }}>
      {children}
    </DaySelectContext.Provider>
  );
}

function useDaySelectModal() {
  const context = useContext(DaySelectContext);

  if (!context) {
    throw new Error('use of DaySelectContext outside of its provider');
  }

  return context;
}

export { DaySelectModalProvider, useDaySelectModal };
