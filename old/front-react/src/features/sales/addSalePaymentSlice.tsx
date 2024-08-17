import { createSlice, PayloadAction } from "@reduxjs/toolkit";




// accept object have some props 
// genrate actions and reducer

const slice = createSlice({
    name: "addSalePayment",
    initialState : {
    info: {
     
        },

        
    },
    // use to update data
    reducers: {

        addSalePaymentSlice: (state, action: PayloadAction) => {
            state.info = action.payload             
          
        }, 

        

    }
});

export const {addSalePaymentSlice}  = slice.actions;

export default slice.reducer;