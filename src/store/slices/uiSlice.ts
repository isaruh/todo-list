import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    globalLoading: boolean;
    globalError: string | null;
}

const initialState: UiState = {
    globalLoading: false,
    globalError: null
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        startLoading(state) {
            state.globalLoading = true;
            state.globalError = null;
        },
        stopLoading(state) {
            state.globalLoading = false;
        },
        setError(state, action: PayloadAction<string|null>) {
            state.globalError = action.payload
        }
    }
})

export const {
    startLoading,
    stopLoading,
    setError
} = uiSlice.actions;
export default uiSlice.reducer;