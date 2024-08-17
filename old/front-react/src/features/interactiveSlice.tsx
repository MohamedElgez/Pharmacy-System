
import React from 'react'
import { createSlice ,PayloadAction } from '@reduxjs/toolkit';



const interactiveSlice = createSlice({
    name: 'interactive',
    initialState: {
     value: {   
      status : false,
      message :  '',
     }
    },

    reducers:{
        interactive:(state, action: PayloadAction) => {
   
            state.value = action.payload;
        }

    },

}) 

export const {interactive} = interactiveSlice.actions;
export default interactiveSlice.reducer;