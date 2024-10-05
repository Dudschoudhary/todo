import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        copyTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                navigator.clipboard.writeText(todo.text);
                alert('Todo copied to clipboard!');
            }
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
            if (existingTodo) {
                existingTodo.text = text; // Update the text of the existing todo
                console.log(text) 
                console.log(id) 
            }
        },
    }
});

export const { addTodo, removeTodo, copyTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
