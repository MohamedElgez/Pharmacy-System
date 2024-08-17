import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "Clients",
    initialState :{
        value: {
   
        } ,
    },
    // use to update data
    reducers: {
        Clients: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 

        reset: () => {
            state.value = {initialState};
        }
    }
});

export const {Clients}  = slice.actions;

export default slice.reducer;