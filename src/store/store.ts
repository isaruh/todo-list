import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlice";
import uiReducer from "./slices/uiSlice";
import createSagaMiddleware from "redux-saga";
import { todosSaga } from "./sagas/todosSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(saga)
});

saga.run(todosSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
