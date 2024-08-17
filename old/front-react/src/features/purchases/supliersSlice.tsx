import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "Supliers",
    initialState :{
        value: {
            'name': '',
   
        } ,
    },
    // use to update data
    reducers: {
        Supliers: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 

        reset: () => {
            state.value = {initialState};
        }
    }
});

export const {Supliers}  = slice.actions;

export default slice.reducer;