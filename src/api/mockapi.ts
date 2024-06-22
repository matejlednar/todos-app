// https://66744fb175872d0e0a95fa91.mockapi.io/api/v1/:endpoint
/*
{
   "title":"1-Ullam aliquid quam nostrum doloremque rerum delectus iste dolores.",
   "desc":"1-Perferendis distinctio autem qui. Reprehenderit quibusdam amet alias exercitationem hic. Ab vel neque ut earum quibusdam sequi exercitationem quia. Maxime deleniti doloremque consectetur. Quisquam non facere beatae illum.",
   "date":"2092-08-21T00:44:48.522Z",
   "done":false,
}
*/

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodosType } from "../components/todos/Todos";
import { ITodo } from "../components/list-items/ListItems";
import toast from "react-hot-toast";

const baseURL = "https://66744fb175872d0e0a95fa91.mockapi.io/api/v1/todos/";

/**
 * mockapi doesnt support multiple filter commands, e.g. done=boolean&filter=value
 *
 * @param type number - Todos type
 * @returns promise
 */
export function useGetAllData(type: TodosType /*, filter: string = ""*/) {
  return useQuery({
    queryKey: ["TODOSData", type /*, filter*/],
    queryFn: () => {
      // loading manager, loading only necessary data
      const url = new URL(baseURL);
      // totals are not supported, making on call for all
      /*
      if (type === TodosType.COMPLETED) {
        url.searchParams.append("done", "true");
      }
      if (type === TodosType.PENDING) {
        url.searchParams.append("done", "false");
      }
*/
      /*
      if (filter !== "") {
        url.searchParams.append("search", filter);
      }
        */
      return fetch(url).then((res) => res.json());
    },
  });
}

export default function usePostTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ITodo) => {
      const url = new URL(baseURL);
      const resp = await fetch(url, {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data),
      });
      return resp.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Task created!");
      queryClient.invalidateQueries({ queryKey: ["TODOSData"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = new URL(baseURL + id);
      const resp = await fetch(url, {
        method: "DELETE", // Specify the HTTP method
      });
      return resp.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      // console.log("success");
      toast.success("Task deleted!");
      queryClient.invalidateQueries({ queryKey: ["TODOSData"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: number; data: Partial<ITodo> }) => {
      const { data, id } = params;
      const url = new URL(baseURL + id);

      const resp = await fetch(url, {
        method: "PUT", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data),
      });
      return resp.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Task updated!");
      queryClient.invalidateQueries({ queryKey: ["TODOSData"] });
    },
  });
}
