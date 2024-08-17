import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { medicine } from '../../types/common';


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "addUser",
    initialState :{
        value: {
            'name': '',
            'email': '',

        },
    },
    // use to update data
    reducers: {
        addUserSlice: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 
    }
});

export const {addUserSlice}  = slice.actions;

export default slice.reducer;