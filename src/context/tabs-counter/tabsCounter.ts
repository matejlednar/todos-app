import { createContext, useContext } from "react";

export interface ITabsCounter {
  all: number;
  done: number;
  pending: number;
}

export interface ITabsCounterContext {
  tabsCounter: ITabsCounter;
  updateTabsCounter: React.Dispatch<React.SetStateAction<ITabsCounter>>;
}

export const initContextData: ITabsCounter = {
  all: 0,
  done: 0,
  pending: 0,
};

export const TabsCounterContext = createContext<ITabsCounterContext | null>(
  null
);

export const useTabsCounterContext = () => {
  const context = useContext(TabsCounterContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
