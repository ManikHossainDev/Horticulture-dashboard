import AddTodoModule from "./AddTodoModul";
import TodoCard from "./todoCard";
import TodoFilter from "./todoFilter";

const TodoContainer = () => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModule />
        <TodoFilter/>
      </div>
      <div className="bg-primary-gradient w-full  rounded-xl p-[5px] ">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-5">
            <TodoCard />
        </div>
        {/* <div className="bg-white text-2xl p-5 flex justify-center items-center font-bold">
          <p> There is no task pending</p>
        </div> */}
      </div>
    </div>
  );
};

export default TodoContainer;
