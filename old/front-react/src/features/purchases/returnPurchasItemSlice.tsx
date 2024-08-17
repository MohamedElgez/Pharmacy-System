import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PurchaseItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "returnPurchasItem",
    initialState : {
    item: {},
        
    },
    // use to update data
    reducers: {

        returnPurchasItemSlice: (state, action: PayloadAction) => {
        
            state.item = action.payload         
          
        }, 

    }
});

export const {returnPurchasItemSlice}  = slice.actions;

export default slice.reducer;