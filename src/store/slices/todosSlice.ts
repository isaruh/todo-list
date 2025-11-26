import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodosResponse, TodosState } from "../../types/todo.types";

const initialState: TodosState = {
    items: {
        todos: [],
        total: 0,
        skip: 0,
        limit: 0,
    },
    selectedTodo: null,
    loading: false,
    error: null
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // get all
        fetchTodosRequest: (state, _action) => {
            state.loading = true;
            state.error = null;
        },
        fetchTodosSuccess: (state, action: PayloadAction<TodosResponse>) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchTodosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get by id
        fetchTodoByIdRequest: (state, _action) => {
            state.loading = true;
            state.selectedTodo = null;
        },
        fetchTodoByIdSuccess: (state, action: PayloadAction<Todo>) => {
            state.loading = false;
            state.selectedTodo = action.payload;
        },
        fetchTodoByIdFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // create
        createTodoRequest: (_, _action: PayloadAction<Omit<Todo, "id">>) => {},
        createTodoSuccess: (state, action: PayloadAction<Todo>) => {
            state.items.todos.push(action.payload);
        },
        createTodoFailure: () => {},

        // update
        updateTodoRequest: (_state, _action: PayloadAction<Todo>) => {},
        updateTodoSuccess: (state, action: PayloadAction<Todo>) => {
            const index = state.items.todos.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.items.todos[index] = action.payload;
        },
        updateTodoFailure: () => {},

        // delete
        deleteTodoRequest: (_state, _action: PayloadAction<number>) => {},
        deleteTodoSuccess: (state, action: PayloadAction<number>) => {
            state.items.todos = state.items.todos.filter(todo => todo.id !== action.payload);
        },
        deleteTodoFailure: () => {},
    }
});

export const {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    fetchTodoByIdRequest,
    fetchTodoByIdSuccess,
    fetchTodoByIdFailure,
    createTodoRequest,
    createTodoSuccess,
    createTodoFailure,
    updateTodoRequest,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure
} = todosSlice.actions;
export default todosSlice.reducer;