import { useCallback, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import "./ListItems.css";
import { useGetAllData } from "../../api/mockapi";
import { ITodosData, TodosType } from "../todos/Todos";
import {
  ITabsCounter,
  useTabsCounterContext,
} from "../../context/tabs-counter/tabsCounter";
import filterTodos from "../../utils/todosFilter";
import { formatDate } from "../../utils/dateUtils";
import { CheckIcon } from "../icons/Icons";

export interface ITodo {
  title: string;
  description: string;
  datetime: string;
  done: boolean;
  id?: number;
}

export default function ListItems({
  type,
  filter,
  setTodosData,
  sortLatest,
}: {
  type: TodosType;
  filter: string;
  setTodosData: React.Dispatch<React.SetStateAction<ITodosData>>;
  sortLatest: boolean;
}) {
  const [selected, setSelected] = useState<null | ITodo>(null);
  const { isPending, error, data } = useGetAllData(type /*, filter*/);
  const { /*tabsCounter, */ updateTabsCounter } = useTabsCounterContext();
  const [filteredData, setFilteredData] = useState<ITodo[]>([]);

  const setTabsCounter = useCallback(
    (counters: ITabsCounter) => {
      updateTabsCounter(counters);
    },
    [updateTabsCounter]
  );

  /**
   * Update tabs counter
   */
  useEffect(() => {
    if (data) {
      const all = data.length;
      const done = data.filter((todo: ITodo) => todo.done === true).length;
      const pending = data.filter((todo: ITodo) => todo.done === false).length;
      setTabsCounter({ all, done, pending });
    }
  }, [data, setTabsCounter, type]);
  /**
   * Sort and filter data
   */
  useEffect(() => {
    if (data) {
      // Filter the data based on type and filter
      let updatedData = filterTodos(type, data, filter);

      // Apply sorting if sortLatest is true
      if (sortLatest) {
        updatedData = [...updatedData].reverse();
      }

      // Update state with filtered and sorted data
      setFilteredData(updatedData);
    }
  }, [data, type, filter, sortLatest]);

  // Info for a user
  if (isPending || !data) {
    return <div className="text-center mt-10">"Loading..."</div>;
  }

  if (error || !data.length) {
    return (
      <div className="text-center mt-10">
        "An error has occurred: " {error?.message}
      </div>
    );
  }

  // Toggle selection
  function onSelect(item: ITodo) {
    let value!: ITodo | null;
    if (type === TodosType.ALL) {
      return;
    }
    if (selected !== null && selected.title === item.title) {
      value = null;
    } else {
      value = item;
    }

    setSelected(value);
    setTodosData((prev: ITodosData) => ({ ...prev, item: value }));
  }

  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto w-full max-w-2xl">
        <RadioGroup value={selected} /*onChange={onSelect}*/>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {filteredData.map((todo: ITodo) => (
              <RadioGroup.Option
                onClick={() => onSelect(todo)}
                onKeyDown={(e) => { if (e.key === "Enter") onSelect(todo) }}
                key={todo.id}
                value={todo}
                className={({ active, checked }) =>
                  `marker ${todo.done ? "border-l-green-800 " : "border-l-red-800 "
                  }  ${active
                    ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                    : ""
                  }
                  ${checked ? "bg-blue-600 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="h3"
                            className={`font-medium text-base ${checked ? "text-white" : "text-gray-900"
                              }`}
                          >
                            {todo.title}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="div"
                            className={`mt-2 ${checked ? "text-sky-100" : "text-gray-500"
                              }`}
                          >
                            <div>{todo.description}</div>
                            <hr className="mt-2 mb-2" />
                            <span className="me-2">Due Date:</span>
                            <span className="underline underline-offset-2">
                              {formatDate(todo.datetime)}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
