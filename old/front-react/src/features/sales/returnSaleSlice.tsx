import { createSlice, PayloadAction } from "@reduxjs/toolkit";




// accept object have some props 
// genrate actions and reducer
const initialState = {
    name: '',
    SupplierPrice: '',
}
const slice = createSlice({
    name: "returnSale",
    initialState : {
    invoiceInfo: {
            'invoiceNo':'',
            'date':'',
            'supplier':'',
        },

        
    },
    // use to update data
    reducers: {

        returnSaleSlice: (state, action: PayloadAction) => {
            state.invoiceInfo = action.payload             
          
        }, 

        reset: () => {

           state.items = initialState;

        }
        

    }
});

export const {returnSaleSlice, reset}  = slice.actions;

export default slice.reducer;