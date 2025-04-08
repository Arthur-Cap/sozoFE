import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "light" | "dark" | "white" | "forest" | "glass";

interface TopBarState {
  backgroundColor?: string;
  title?: string;
  backgroundImage?: string;
}

interface TopBarContextType {
  topBarState: TopBarState;
  setTopBarState: (state: TopBarState) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

export const TopBarProvider = ({ children }: { children: ReactNode }) => {
  const [topBarState, setTopBarState] = useState<TopBarState>({});

  const [theme, setThemeState] = useState<ThemeType>("glass");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  return (
    <TopBarContext.Provider
      value={{
        topBarState,
        setTopBarState,
        theme,
        setTheme,
      }}
    >
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
