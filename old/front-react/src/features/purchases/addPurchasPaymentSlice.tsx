import { createSlice, PayloadAction } from "@reduxjs/toolkit";




// accept object have some props 
// genrate actions and reducer

const slice = createSlice({
    name: "addPurchasPayment",
    initialState : {
    info: {
     
        },

        
    },
    // use to update data
    reducers: {

        addPurchasPaymentSlice: (state, action: PayloadAction) => {
            state.info = action.payload             
          
        }, 

        

    }
});

export const {addPurchasPaymentSlice}  = slice.actions;

export default slice.reducer;