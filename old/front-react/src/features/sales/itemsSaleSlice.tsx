import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalesItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "itemsSale",
    initialState : {
            items: [] as SaleItems[],
        },
    
    // use to update data
    reducers: {
        itemsSaleSlice: (state, action: PayloadAction) => {
             state.items = action.payload;
        }, 
    }
});

export const {itemsSaleSlice}  = slice.actions;

export default slice.reducer;