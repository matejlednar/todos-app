import { Todos, TodosType } from "./Todos";

export const Completed = () => {
  return <Todos type={TodosType.COMPLETED} />;
};
