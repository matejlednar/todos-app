import { ITodo } from "../components/list-items/ListItems";
import { TodosType } from "../components/todos/Todos";

export default function filterTodos(
  type: TodosType,
  data: ITodo[],
  filter: string
) {
  let result: ITodo[] = data;
  if (data) {
    if (type === TodosType.COMPLETED) {
      result = data.filter((todo: ITodo) => todo.done);
    }
    if (type === TodosType.PENDING) {
      result = data.filter((todo: ITodo) => !todo.done);
    }

    if (filter !== "") {
      result = result.filter(
        (todo: ITodo) =>
          todo.description.toLowerCase().includes(filter.toLowerCase()) ||
          todo.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
  }
  return result;
}
