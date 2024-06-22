import { Tab } from "@headlessui/react";
import classNames from "classnames";
import About from "../about/About";
import { All } from "../todos/All";
import { Pending } from "../todos/Pending";
import { Completed } from "../todos/Completed";
import { useTabsCounterContext } from "../../context/tabs-counter/tabsCounter";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface ITabName {
  label: string;
  todos?: number;
}

export default function Tabs() {
  const { tabsCounter /*, updateTabsCounter */ } = useTabsCounterContext();
  const tabNames: ITabName[] = [
    { label: "All", todos: tabsCounter.all },
    { label: "Completed", todos: tabsCounter.done },
    { label: "Pending", todos: tabsCounter.pending },
    { label: "About" },
  ];
  const widgets = [<All />, <Completed />, <Pending />, <About />];

  useEffect(() => {
    if (tabsCounter.all > 19) {
      toast.error("The demo is restricted to 20 Todos.");
    }
  }, [tabsCounter.all]);

  return (
    <div className="w-full max-w-4xl px-2 py-16 sm:px-0 m-auto">
      <Tab.Group>
        <Tab.List className="flex gap-2 space-x-1 rounded-xl bg-indigo-700/90 p-1">
          {tabNames.map((tab: ITabName) => (
            <Tab
              key={tab.label}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              <span className="tab-label">{tab.label} </span>
              {tab.todos !== undefined && (
                <span className="tab-label">({tab.todos})</span>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {widgets.map((widget, index) => (
            <Tab.Panel
              key={index}
              className={classNames(
                "bg-slate-100 min-h-72 rounded-xl p-3 max-w-xl-2 relative",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-slate-100",
                "px-10 "
              )}
            >
              {widget}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
