export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export interface TodosResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number
}

export interface TodosQuery {
    skip?: number;
    limit?: number;
}

export interface TodosState {
    items: TodosResponse;
    selectedTodo: Todo | null;
    loading: boolean;
    error: string | null;
}