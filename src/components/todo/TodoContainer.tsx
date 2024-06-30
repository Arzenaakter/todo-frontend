import { useState } from "react";
import { useGetTodosQuery } from "../../redux/api/api";
// import { useAppSelector } from "../../redux/hook";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
  const [priority, setPriority] = useState("");

  // const { todos } = useAppSelector((state) => state.todos);

  //* from server

  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter setPriority={setPriority} priority={priority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px] ">
        {/* <div className="bg-white rounded-xl p-5 ">
          <p className="text-center font-bold text-3xl">
            There is no task pending
          </p>
        </div> */}
        <div className="bg-white p-5 h-full w-full rounded-xl space-y-5">
          {todos?.data?.map((item) => (
            <TodoCard
              key={item._id}
              {...item}
              // title={item.title}
              // description={item.description}
              // id={item.id}
              // isCompleted={item.isCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
