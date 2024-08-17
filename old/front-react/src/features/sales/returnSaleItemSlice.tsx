import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalesItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "returnSaleItem",
    initialState : {
    item: {},
        
    },
    // use to update data
    reducers: {

        returnSaleItemSlice: (state, action: PayloadAction) => {
        
            state.item = action.payload         
          
        }, 

    }
});

export const {returnSaleItemSlice}  = slice.actions;

export default slice.reducer;