import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PurchaseItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "addPurchasItem",
    initialState : {
    item: {},
        
    },
    // use to update data
    reducers: {

        addPurchasItemSlice: (state, action: PayloadAction) => {
        
            state.item = action.payload         
          
        }, 

    }
});

export const {addPurchasItemSlice}  = slice.actions;

export default slice.reducer;