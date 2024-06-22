import Tabs from "../../components/tabs/Tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TabsCounterContextProvider from "../../context/tabs-counter/tabsCounterProvider";

export const Main = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TabsCounterContextProvider>
        <Tabs />
      </TabsCounterContextProvider>
    </QueryClientProvider>
  );
};
