import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "addClient",
    initialState :{
        value: {
    
        },
    },
    // use to update data
    reducers: {
        addClientSlice: (state, action: PayloadAction) => {
            state.value = action.payload;
        }, 
    }
});

export const {addClientSlice}  = slice.actions;

export default slice.reducer;