import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { medicine } from '../../types/common';


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "addCategory",
    initialState :{
        value: {
            'name': '',
  
        },
    },
    // use to update data
    reducers: {
        addCategorySlice: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 
    }
});

export const {addCategorySlice}  = slice.actions;

export default slice.reducer;