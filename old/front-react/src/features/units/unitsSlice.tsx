import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "units",
    initialState :{
        value: {
            'name': '',
   
        } ,
    },
    // use to update data
    reducers: {
        units: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 

        reset: () => {
            state.value = {initialState};
        }
    }
});

export const {units}  = slice.actions;

export default slice.reducer;