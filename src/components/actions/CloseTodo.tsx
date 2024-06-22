import { ActionButtons } from "./ActionButtons";

export const CloseTodo = ({
  okAction,
  cancelAction,
}: {
  okAction: () => void;
  cancelAction: () => void;
}) => {
  return (
    <div>
      <div className="mb-10">
        Would you like to set the selected task as done?
      </div>

      <ActionButtons okAction={okAction} cancelAction={cancelAction} />
    </div>
  );
};
