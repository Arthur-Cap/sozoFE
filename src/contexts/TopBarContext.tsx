import { createContext, useContext, useState, ReactNode } from "react";

interface TopBarState {
  backgroundColor?: string;
  title?: string;
  backgroundImage?: string;
}

interface TopBarContextType {
  state: TopBarState;
  setTopBarState: (state: TopBarState) => void;
}

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

export const TopBarProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<TopBarState>({});

  return (
    <TopBarContext.Provider value={{ state, setTopBarState: setState }}>
      {children}
    </TopBarContext.Provider>
  );
};

export const useTopBar = () => {
  const context = useContext(TopBarContext);
  if (!context) {
    throw new Error("useTopBar must be used within TopBarProvider");
  }
  return context;
};
