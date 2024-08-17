
import React from 'react'
import { createSlice ,PayloadAction } from '@reduxjs/toolkit';
import { modalType,  } from '../types/common';



const modalSlice = createSlice({
    name: 'modalState',
    initialState: {
      modalStatus: {
          name: "",
          isOpen: false,
      } as modalType
    },

    reducers:{

        modal:(state, action: PayloadAction<modalType>) => {
            state.modalStatus = action.payload;
        }

    },

}) 

export const {modal} = modalSlice.actions;
export default modalSlice.reducer;



