import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { TTodoCardProps } from "../../components/todo/TodoCard";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          // url: `/tasks?priority=${priority}`,
          url: `/tasks`,
          method: "GET",
          //   params: { priority },
          params: params,
        };
      },
      providesTags: ["todo"],
    }),
    AddTodo: builder.mutation({
      query: (data) => {
        return {
          url: "/task",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    UpdateTodo: builder.mutation({
      query: (data) => {
        return {
          url: `/task/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    DeleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/task/${id}`,
          method: "DELETE",
          //   body: data.data,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
