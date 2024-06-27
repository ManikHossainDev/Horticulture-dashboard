import TodoCard from "./todoCard";

const TodoContainer = () => {
  return (
    <div>
      <div>
        <button>Add todo</button>
        <button>Filter</button>
      </div>
      <div className="bg-red-500 w-full  rounded-xl p-5 space-y-5">
     <div className="bg-white text-2xl p-5 flex justify-center items-center font-bold">
      <p>  There is no task pending</p>
     </div>
      </div>
    </div>
  );
};

export default TodoContainer;
