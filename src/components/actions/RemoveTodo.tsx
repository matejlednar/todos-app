import { ActionButtons } from "./ActionButtons";

export const RemoveTodo = ({
  okAction,
  cancelAction,
}: {
  okAction: () => void;
  cancelAction: () => void;
}) => {
  return (
    <div>
      <div className="mb-10">Do you want to remove the selected task?</div>
      <ActionButtons okAction={okAction} cancelAction={cancelAction} />
    </div>
  );
};
