import Button from "../button/Button";

export const ActionButtons = ({
  okAction,
  cancelAction,
}: {
  okAction: () => void;
  cancelAction: () => void;
}) => {
  return (
    <div className="flex gap-2 justify-end">
      <Button
        label="Yes"
        className="bg-green-800 hover:bg-green-600"
        action={okAction}
      />
      <Button
        label="No"
        className="bg-red-800 hover:bg-red-600"
        action={cancelAction}
      />
    </div>
  );
};
