import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalesItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "addSale",
    initialState : {
    invoiceInfo: {
            'invoiceNo':'',
            'date':'',
            'supplier':'',
        },

        
    },
    // use to update data
    reducers: {

        addSaleSlice: (state, action: PayloadAction) => {
            state.invoiceInfo = action.payload             
          
        }, 

        reset: () => {

           state.items = initialState;

        }
        

    }
});

export const {addSaleSlice, reset}  = slice.actions;

export default slice.reducer;