import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PurchaseItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "itemsPurchase",
    initialState : {
            items: [] as PurchaseItems[],
        },
    
    // use to update data
    reducers: {
        itemsPurchaseSlice: (state, action: PayloadAction) => {
             state.items = action.payload;
        }, 
    }
});

export const {itemsPurchaseSlice}  = slice.actions;

export default slice.reducer;