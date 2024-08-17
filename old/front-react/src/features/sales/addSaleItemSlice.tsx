import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalesItems } from "../../types/common";



// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "addSaleItem",
    initialState : {
    item: {},
        
    },
    // use to update data
    reducers: {

        addSaleItemSlice: (state, action: PayloadAction) => {
        
            state.item = action.payload         
          
        }, 

    }
});

export const {addSaleItemSlice}  = slice.actions;

export default slice.reducer;