import { Todos, TodosType } from "./Todos";

export const Pending = () => {
  return <Todos type={TodosType.PENDING} />;
};
