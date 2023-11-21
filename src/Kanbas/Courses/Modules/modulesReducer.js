import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";
const initialState = {
    modules: [],
    module: { name: "New Module 123", description: "New Description" },
};
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action) => {
            state.modules = action.payload;
        },
        addModule: (state, action) => {
            state.modules = [
                action.payload, ...state.modules,
            ];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module) => module._id !== action.payload
            );
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map((module) => {
                if (module._id === action.payload._id) {
                    return action.payload;
                } else {
                    return module;
                }
            });
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
    },
});
export const { addModule, deleteModule,
updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;