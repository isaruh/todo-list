import type { Todo, TodosQuery, TodosResponse } from "../types/todo.types";
import api from "./api";

export async function getTodos(query: TodosQuery = {}): Promise<TodosResponse> {
    const res = await api.get("/todos", { params: query });
    return res.data;
}

export async function getTodosById(id: number): Promise<Todo> {
    const res = await api.get(`/todos/${id}`);
    return res.data;
}

export async function createTodo(payload: Omit<Todo, "id">) {
    console.log(payload);
    await api.post("/todos/add", payload);
    console.log("create");
}

export async function updateTodo(payload: Todo) {
    await api.put(`/todos/${payload.id}`, payload);
}

export async function deleteTodo(id: number) {
    await api.put(`/todos/${id}`);
    console.log("delete")
}