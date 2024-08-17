import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PurchaseItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "login",
    initialState:{
    auth : {
            'auth': false,
            'id': '',
            'token': '',
            'name': '',
        },
    },
    
    // use to update data
    reducers: {
        loginSlice: (state, action: PayloadAction) => {
             state.auth = action.payload;
        }, 
    }
});

export const {loginSlice}  = slice.actions;

export default slice.reducer;