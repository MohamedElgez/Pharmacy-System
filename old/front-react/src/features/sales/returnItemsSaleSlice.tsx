import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalesItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "returntemsSale",
    initialState : {
            items: [],
        },
    
    // use to update data
    reducers: {
        returnItemsSaleSlice: (state, action: PayloadAction) => {
             state.items = action.payload;
        }, 
    }
});

export const {returnItemsSaleSlice}  = slice.actions;

export default slice.reducer;