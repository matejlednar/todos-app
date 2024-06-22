import { ReactNode, useState } from "react";
import {
  initContextData,
  ITabsCounter,
  ITabsCounterContext,
  TabsCounterContext,
} from "./tabsCounter";

export default function TabsCounterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tabsCounter, updateTabsCounter] =
    useState<ITabsCounter>(initContextData);
  const contextValue: ITabsCounterContext = { tabsCounter, updateTabsCounter };
  return (
    <TabsCounterContext.Provider value={contextValue}>
      {children}
    </TabsCounterContext.Provider>
  );
}
