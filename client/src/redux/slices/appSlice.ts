import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface appSliceInitialState {
    
    currentUser:{
        username: string,
        picture: string,
        email: string,
        savedCodes ?: string[];
    };

    isLoggedIn:boolean

}

const initialState: appSliceInitialState = {
    currentUser: {
        username: "",
        picture: "",
        email: "",
        savedCodes : []
    },
isLoggedIn: false,
};


const appSlice = createSlice({

    name: "appSlice",
    initialState,
    reducers: {
        // Add your reducers here
        updateCurrentUser :(state, action:PayloadAction<appSliceInitialState["currentUser"]>) => {
            state.currentUser = action.payload;
        },

        updateIsLoggedIn :(state, action:PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    },

});

export default appSlice.reducer;

export const{updateCurrentUser , updateIsLoggedIn} = appSlice.actions;