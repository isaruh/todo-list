import { call, put, takeLatest } from "redux-saga/effects";
import {
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
    deleteTodoFailure,
} from "../slices/todosSlice";

import {
    getTodos,
    getTodosById,
    createTodo,
    updateTodo,
    deleteTodo
} from "../../services/todo.services";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodosQuery, TodosResponse } from "../../types/todo.types";
import { startLoading, stopLoading } from "../slices/uiSlice";

function* handleFetchTodos(action: PayloadAction<TodosQuery | undefined>): Generator {
    try {
        yield put(startLoading());
        const res = (yield call(getTodos, action.payload)) as TodosResponse;
        yield put(fetchTodosSuccess(res));
    } catch (err: any) {
        yield put(fetchTodosFailure(err.message));
    } finally {
        yield put(stopLoading());
    }
}

function* handleFetchTodoById(action: PayloadAction<number>): Generator {
    try {
        yield put(startLoading());
        const res: any = yield call(getTodosById, action.payload);
        yield put(fetchTodoByIdSuccess(res));
    } catch (err: any) {
        yield put(fetchTodoByIdFailure(err.message));
    } finally {
        yield put(stopLoading());
    }
}

function* handleCreateTodo(action: PayloadAction<Todo, "id">): Generator {
    try {
        yield call(createTodo, action.payload);
        yield put(createTodoSuccess(action.payload))
    } catch (err: any) {
        yield put(createTodoFailure(err.message));
    }
}

function* handleUpdateTodo(action: PayloadAction<Todo>): Generator {
    try {
        yield call(updateTodo, action.payload);
        yield put(updateTodoSuccess(action.payload));
    } catch (err: any) {
        yield put(updateTodoFailure(err.message));
    }
}

function* handleDeleteTodo(action: PayloadAction<number>): Generator {
    try {
        yield call(deleteTodo, action.payload);
        yield put(deleteTodoSuccess(action.payload));
    } catch (err: any) {
        yield put(deleteTodoFailure(err.message));
    }
}

export function* todosSaga() {
    yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
    yield takeLatest(fetchTodoByIdRequest.type, handleFetchTodoById);
    yield takeLatest(createTodoRequest.type, handleCreateTodo);
    yield takeLatest(updateTodoRequest.type, handleUpdateTodo);
    yield takeLatest(deleteTodoRequest.type, handleDeleteTodo);
}
