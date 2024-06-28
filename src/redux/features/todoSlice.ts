import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TTodo = {
    id : string;
    title:string;
    description:string;
    isComplete?: boolean;
}
type TInitialState = {
    todos: TTodo[];  // Array of Todo objects
}
const initialState:TInitialState = {
    todos:[],
}
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo : (state, action:PayloadAction<TTodo>) => {
            state.todos.push({...action.payload, isComplete:false});
        },
        removeTodo : (state, action:PayloadAction<string>) => {
           state.todos.filter((item) => item.id === action.payload)
        }
    },

})

export const { addTodo, removeTodo } = todoSlice.actions;  

export default todoSlice.reducer;