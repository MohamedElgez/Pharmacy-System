import { configureStore } from "@reduxjs/toolkit";
import categories  from "../features/categories/categoriesSlice";
import addCategory  from "../features/categories/addCategorySlice";
import units  from "../features/units/unitsSlice";
import addUnit from "../features/units/addUnitSlice";
import  interactive  from "../features/interactiveSlice";
import  addMedicine  from "../features/medicines/addMedicineSlice";
import  medicines  from "../features/medicines/medicinesSlice";
import  addSuplier  from "../features/supliers/addSuplierSlice";
import  supliers  from "../features/supliers/supliersSlice"; 

import  addClient from "../features/clients/addClientSlice";
import  clients  from "../features/clients/clientsSlice";


import  addPurchase  from "../features/purchases/addPurchaseSlice";
import  addPurchasItem  from "../features/purchases/addPurchasItemSlice";
import  itemsPurchase  from "../features/purchases/itemsPurchaseSlice";

import  returnPurchase  from "../features/purchases/returnPurchaseSlice";
import  returnPurchasItem  from "../features/purchases/returnPurchasItemSlice";
import  returnItemsPurchase  from "../features/purchases/returnItemsPurchaseSlice";

import  addPurchasPayment  from "../features/purchases/addPurchasPaymentSlice";

import  addSale  from "../features/sales/addSaleSlice";
import  addSaleItem  from "../features/sales/addSaleItemSlice";
import  itemsSale  from "../features/sales/itemsSaleSlice";

import  addSalePayment  from "../features/sales/addSalePaymentSlice";

import  returnSale  from "../features/sales/returnSaleSlice";
import  returnSaleItem  from "../features/sales/returnSaleItemSlice";
import  returnItemsSale  from "../features/sales/returnItemsSaleSlice";

import  addUser  from "../features/users/addUserSlice";
import  users from "../features/users/usersSlice";
import login from '../features/loginSlice'

import  modal  from "../features/modalSlice";
import { medicinesApi } from "../services/medicines/medicines";

// create store 
export const store = configureStore({

    // use to write and read from store
    reducer: {
        medicines,
        addMedicine,
        modal,
        interactive,
        categories,
        addCategory,
        units,
        addUnit,
        supliers,
        addSuplier,
        addPurchase,
        itemsPurchase,
        addPurchasItem,
        returnPurchase,
        returnItemsPurchase,
        returnPurchasItem,
        addSale,
        itemsSale,
        addSaleItem,
        returnSale,
        returnItemsSale,
        returnSaleItem,

        login,
        users,
        addUser,
        addPurchasPayment,
        addSalePayment,
        addClient,
        clients,
    

        
        [medicinesApi.reducerPath] : medicinesApi.reducer,
    },
    middleware : (getMiddleware) => getMiddleware().concat(medicinesApi.middleware),
    
    devTools: process.env.NODE_ENV !== 'production'
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

