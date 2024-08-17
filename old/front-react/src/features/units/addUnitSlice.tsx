import { createSlice, PayloadAction } from "@reduxjs/toolkit";



// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "addUnit",
    initialState :{
        value: {
            'name': '',
  
        },
    },
    // use to update data
    reducers: {
        addUnitSlice: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 
    }
});

export const {addUnitSlice}  = slice.actions;

export default slice.reducer;