import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import {
  getMinDueToISODateTime,
  getMinDatetime,
} from "../../utils/dateUtils";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type TodoFormInputs = {
  title: string;
  description: string;
  datetime: string;
};

export const enum TodoFormType {
  ADD,
  EDIT,
}

// Validation schema
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(75, "Title cannot exceed 75 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  datetime: yup
    .date()
    .required("Deadline is required")
    .min(formatDate(getMinDatetime()), "Deadline must be in the future"),
});

/**
 * Convert ISO date to the supported input field value format
 *
 * @param date string - ISO date
 * @returns string
 */

function formatDate(date: string) {
  return date.slice(0, 16);
}

export const TodoForm = ({
  type,
  okAction,
  cancelAction,
  title,
  description,
  datetime,
}: {
  type: TodoFormType;
  okAction: (data: TodoFormInputs) => void;
  cancelAction: () => void;
  title?: string;
  description?: string;
  datetime?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInputs | any>({
    defaultValues: {
      title,
      description,
      datetime: datetime
        ? formatDate(datetime)
        : formatDate(getMinDueToISODateTime()),
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    okAction(data);
  };

  // error component
  const Error = ({ children }: { children: any }) => (
    <span className="text-red-800 mt-2">{children}</span>
  );

  // correct label for the ok button
  const okButtonLabel = type === TodoFormType.ADD ? "Create" : "Update";

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Title
      </label>
      <input
        {...register("title")}
        type="text"
        id="title"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter a title for your task"
      />
      {errors.title && <Error>{errors.title.message}</Error>}

      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700 mt-2"
      >
        Description
      </label>
      <textarea
        id="description"
        className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter a description for your task"
        rows={5}
        {...register("description")}
      ></textarea>
      {errors.description && <Error>{errors.description.message}</Error>}

      <label
        htmlFor="datetime"
        className="block text-sm font-medium text-gray-700 mt-2"
      >
        Select due date and time.
      </label>
      <input
        {...register("datetime")}
        type="datetime-local"
        id="datetime"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />

      {errors.datetime && <Error>{errors.datetime.message}</Error>}

      <div className="flex gap-2 justify-end mt-5">
        <Button
          label={okButtonLabel}
          className="bg-green-800 hover:bg-green-600"
          // action={okAction}
          type="submit"
        />
        <Button
          label="Cancel"
          className="bg-red-800 hover:bg-red-600"
          action={cancelAction}
        />
      </div>
    </form>
  );
};
