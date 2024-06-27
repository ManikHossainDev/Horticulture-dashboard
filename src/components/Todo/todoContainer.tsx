import { Button } from "../ui/button";
import TodoCard from "./todoCard";

const TodoContainer = () => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <Button className="bg-primary-gradient text-xl font-semibold">Add todo</Button>
        <Button>Filter</Button>
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
