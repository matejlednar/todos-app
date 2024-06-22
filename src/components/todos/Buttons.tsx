import Button from "../button/Button";
import {
  IconBack,
  IconDelete,
  IconDone,
  IconEdit,
  IconNew,
  IconSort,
} from "../icons/Icons";
import { ITodosData } from "./Todos";

export const ButtonNew = (
  setModalData: React.Dispatch<React.SetStateAction<ITodosData>>,
  disabled: boolean
) => (
  <Button
    action={() =>
      setModalData((prev: ITodosData) => ({
        ...prev,
        showModal: true,
        type: "NEW",
      }))
    }
    className="bg-green-800 hover:bg-green-600"
    label="New"
    disabled={disabled}
  >
    <IconNew />
  </Button>
);

export const ButtonDone = (
  setModalData: React.Dispatch<React.SetStateAction<ITodosData>>,
  disabled: boolean
) => (
  <Button
    action={() =>
      setModalData((prev: ITodosData) => ({
        ...prev,
        showModal: true,
        type: "DONE",
      }))
    }
    className="bg-green-800 hover:bg-green-600"
    label="Done"
    disabled={disabled}
  >
    <IconDone />
  </Button>
);

export const ButtonEdit = (
  setModalData: React.Dispatch<React.SetStateAction<ITodosData>>,
  disabled: boolean
) => (
  <Button
    action={() =>
      setModalData((prev: ITodosData) => ({
        ...prev,
        showModal: true,
        type: "EDIT",
      }))
    }
    className="bg-blue-800 hover:bg-blue-600"
    label="Edit"
    disabled={disabled}
  >
    <IconEdit />
  </Button>
);

export const ButtonIncompete = (
  setModalData: React.Dispatch<React.SetStateAction<ITodosData>>,
  disabled: boolean
) => (
  <Button
    action={() =>
      setModalData((prev: ITodosData) => ({
        ...prev,
        showModal: true,
        type: "INCOMPLETE",
      }))
    }
    className="bg-blue-800 hover:bg-blue-600"
    label="Open"
    disabled={disabled}
  >
    <IconBack />
  </Button>
);

export const ButtonRemove = (
  setModalData: React.Dispatch<React.SetStateAction<ITodosData>>,
  disabled: boolean
) => (
  <Button
    action={() =>
      setModalData((prev: ITodosData) => ({
        ...prev,
        showModal: true,
        type: "REMOVE",
      }))
    }
    className="bg-red-800 hover:bg-red-600"
    label="Remove"
    disabled={disabled}
  >
    <IconDelete />
  </Button>
);

export const ButtonSort = (
  setSortLatest: React.Dispatch<React.SetStateAction<boolean>>
) => (
  <Button
    action={() => setSortLatest((prev) => !prev)}
    className=""
    label="Sort"
  >
    <IconSort />
  </Button>
);
