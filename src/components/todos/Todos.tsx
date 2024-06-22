import ModalDialog from "../modal-dialog/ModalDialog";
import ListItems, { ITodo } from "../list-items/ListItems";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../hooks/UseDebounde";
import {
  ButtonDone,
  ButtonEdit,
  ButtonIncompete,
  ButtonNew,
  ButtonRemove,
  ButtonSort,
} from "./Buttons";
import { RemoveTodo } from "../actions/RemoveTodo";
import { CloseTodo } from "../actions/CloseTodo";
import { OpenTodo } from "../actions/OpenTodo";
import { TodoForm, TodoFormInputs, TodoFormType } from "../forms/TodoForm";
import createTitle from "./helper";
import usePostTodo, { useDeleteTodo, useUpdateTodo } from "../../api/mockapi";
import { useTabsCounterContext } from "../../context/tabs-counter/tabsCounter";

export enum TodosType {
  ALL,
  COMPLETED,
  PENDING,
}

export interface ITodosData {
  showModal: boolean;
  type: "NEW" | "REMOVE" | "EDIT" | "DONE" | "INCOMPLETE" | "ADD" | "NONE";
  item: ITodo | null;
}

const initTodosData: ITodosData = {
  showModal: false,
  type: "NONE",
  item: null,
};

export const Todos = ({ type }: { type: TodosType }) => {
  const saveTodo = usePostTodo();
  const removeTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const [sortLatest, setSortLatest] = useState<boolean>(true);
  const [todosData, setTodosData] = useState<ITodosData>(initTodosData);
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInputValue = useDebounce<string>(inputValue, 500); // 500ms debounce delay
  const { tabsCounter /*, updateTabsCounter*/ } = useTabsCounterContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const disabled = todosData.item === null;
  let buttonNew;
  if (tabsCounter.all < 20) {
    buttonNew = ButtonNew(setTodosData, false);
  } else {
    buttonNew = ButtonNew(setTodosData, true);
  }
  const buttonIncompete = ButtonIncompete(setTodosData, disabled);
  const buttonRemove = ButtonRemove(setTodosData, disabled);
  const buttonEdit = ButtonEdit(setTodosData, disabled);
  const buttonDone = ButtonDone(setTodosData, disabled);
  const buttonSort = ButtonSort(setSortLatest);

  const allTodo = [buttonNew];
  const completedTodos = [buttonNew, buttonIncompete, buttonRemove];
  const pendingTodos = [buttonNew, buttonEdit, buttonDone, buttonRemove];

  let buttons = [];

  switch (type) {
    case TodosType.ALL:
      buttons = allTodo;
      break;
    case TodosType.COMPLETED:
      buttons = completedTodos;
      break;
    case TodosType.PENDING:
      buttons = pendingTodos;
      break;
  }

  function editItem(updatedData: TodoFormInputs) {
    closeModalDialog();
    if (todosData.item) {
      updateTodo.mutate({
        id: todosData.item.id as number,
        data: { ...todosData.item, ...updatedData },
      });
    }
    setTodosData((prev) => ({ ...prev, item: null }));
  }

  function removeItem() {
    closeModalDialog();
    if (todosData.item) {
      removeTodo.mutate(todosData.item?.id as number);
    }
    setTodosData((prev) => ({ ...prev, item: null }));
  }
  function closeItem() {
    closeModalDialog();
    if (todosData.item) {
      updateTodo.mutate({
        id: todosData.item.id as number,
        data: { done: true },
      });
    }
    setTodosData((prev) => ({ ...prev, item: null }));
  }
  function openItem() {
    closeModalDialog();
    if (todosData.item) {
      updateTodo.mutate({
        id: todosData.item.id as number,
        data: { done: false },
      });
    }
    setTodosData((prev) => ({ ...prev, item: null }));
  }
  function createNewItem(data: TodoFormInputs) {
    closeModalDialog();
    saveTodo.mutate({ ...data, done: false });
  }

  function cancelAction() {
    setTodosData((prev: ITodosData) => ({ ...prev, showModal: false }));
  }

  function closeModalDialog() {
    setTodosData((prev: ITodosData) => ({ ...prev, showModal: false }));
  }

  const title = createTitle(todosData.type);

  return (
    <div>
      <ModalDialog
        show={todosData.showModal}
        title={title}
        closeAction={closeModalDialog}
      >
        <div className="mt-4">
          {todosData.type === "REMOVE" && (
            <RemoveTodo okAction={removeItem} cancelAction={cancelAction} />
          )}
          {todosData.type === "DONE" && (
            <CloseTodo okAction={closeItem} cancelAction={cancelAction} />
          )}
          {todosData.type === "INCOMPLETE" && (
            <OpenTodo okAction={openItem} cancelAction={cancelAction} />
          )}

          {todosData.type === "NEW" && (
            <TodoForm
              type={TodoFormType.ADD}
              okAction={createNewItem}
              cancelAction={cancelAction}
            />
          )}
          {todosData.type === "EDIT" && (
            <TodoForm
              type={TodoFormType.EDIT}
              okAction={editItem}
              cancelAction={cancelAction}
              title={todosData.item?.title}
              description={todosData.item?.description}
              datetime={todosData.item?.datetime}
            />
          )}
        </div>
      </ModalDialog>

      <div className="inset-0 flex items-center justify-between mb-2">
        <div className="flex items-centers gap-4">
          {buttonSort}

          <input
            className="ps-2 shadow-md"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search ..."
          />
        </div>
        <div className="flex gap-2 items-center">
          {buttons.map((button, index) => (
            <span key={"button_" + index}>{button}</span>
          ))}
        </div>
      </div>

      <ListItems
        type={type}
        filter={debouncedInputValue}
        setTodosData={setTodosData}
        sortLatest={sortLatest}
      />
    </div>
  );
};
