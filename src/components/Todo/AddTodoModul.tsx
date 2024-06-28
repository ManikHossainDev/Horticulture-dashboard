import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useAppDispatch, } from "@/redux/hook";
import { addTodo } from "@/redux/features/todoSlice";
import { useCreateTodoMutation } from "@/redux/api/api";

const AddTodoModule = () => {
  
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  // const dispatch  = useAppDispatch()

  const [addTodo, {isError, isLoading, isSuccess}] = useCreateTodoMutation()

  

  
const onSubmit = (e: FormEvent) => {
  e.preventDefault();

  // const randomString = Math.random().toString(36).substring(2, 7) ;
  
  const taskDetails = {
    title:task,
    description: description,
    priority: priority,
  }
  addTodo(taskDetails);
  // console.log(taskDetails);
  // dispatch(addTodo(taskDetails));
};


  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="bg-primary-gradient text-xl font-semibold">
        Add Todo{" "}
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add task</DialogTitle>
        <DialogDescription>
          Add your tasks that you want to finish.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input
              onBlur={(e) => setTask(e.target.value)}
              id="Task"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              onBlur={(e) => setDescription(e.target.value)}
              id="Description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Priority</Label>
            <Select onValueChange={(value)=> setPriority(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="high">high</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="low">low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  </Dialog>
  );
};

export default AddTodoModule;