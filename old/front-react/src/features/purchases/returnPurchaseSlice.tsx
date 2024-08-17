import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PurchaseItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "returnPurchase",
    initialState : {
    invoiceInfo: {
            'invoiceNo':'',
            'date':'',
            'supplier':'',
        },

        
    },
    // use to update data
    reducers: {

        returnPurchaseSlice: (state, action: PayloadAction) => {
            state.invoiceInfo = action.payload             
          
        }, 

        reset: () => {

           state.items = initialState;

        }
        

    }
});

export const {returnPurchaseSlice, reset}  = slice.actions;

export default slice.reducer;