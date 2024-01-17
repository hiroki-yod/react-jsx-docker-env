import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state, action) => {
            const log_in_user = action.payload;
            state.user = log_in_user;
        },
        logOut: (state) => {
            state.user = null;
        },
    },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
