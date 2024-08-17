import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// accept object have some props 
// genrate actions and reducer
const slice = createSlice({
    name: "users",
    initialState :{
        value: {
            'name': '',
   
        } ,
    },
    // use to update data
    reducers: {
        users: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }, 

        reset: () => {
            state.value = {initialState};
        }
    }
});

export const {users}  = slice.actions;

export default slice.reducer;