import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { medicine } from '../../types/common';


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "medicines",
    initialState :{
        value: {
            'name': '',
            'type_id': '',
            'code': '',
            'price': '',
            'unit_price': '',
            'quantity': '',
            'category_id': '',
            'unit_id': '',
            'supplier_id': '',
            'expiration': '',
        } as medicine,
    },
    // use to update data
    reducers: {
        medicines: (state, action: PayloadAction<medicine>) => {
            state.value = action.payload;
        }, 

        reset: () => {
            state.value = initialState;
        }
    }
});

export const {medicines}  = slice.actions;

export default slice.reducer;
