import React, { Fragment, useState , lazy } from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {store } from './app/store';
import Footer from './components/Footer';
 const Header = lazy(() =>  import('./components/Header'));
import Sidebar from './components/Sidebar';
import Index from './pages/Index';
import Login from './pages/Login';
import AddMedicine from './pages/Medicines/AddMedicines';
import AllMedicines from './pages/Medicines/AllMedicines';
import AddCategory from './pages/Categories/AddCategory';
import AllCategories from './pages/Categories/AllCategories';
import AllUnits from './pages/Units/AllUnits';
import AddUnit from './pages/Units/AddUnit';
import AllTypes from './pages/Types/AllTypes';
import AddType from './pages/Types/AddType';
import AddPurchase from './pages/Purchase/AddPurchase';
import AllPurchases from './pages/Purchase/AllPurchases';
import AddReturnPurchas from './pages/Purchase/AddReturnPurchas';
import AllReturnPurchases from './pages/Purchase/AllReturnPurchases';
import AllSupliers from './pages/Supliers/AllSupliers';
import AddSuplier from './pages/Supliers/AddSuplier';
import AllUsers from './pages/Users/AllUsers';
import AddUser from './pages/Users/AddUser';
import  ProductedRoute from './pages/ProductedRoute';

import { HeaderLayout } from './components/HeaderLayout';
import  CheckLogin from './pages/CheckLogin';
import AddSale from './pages/Sales/AddSale';
import AddReturnSale from './pages/Sales/AddReturnSale';
import AllReturnSales from './pages/Sales/AllReturnSales';
import AllSales from './pages/Sales/AllSales';
import  AddPurchasPayment  from './pages/Purchase/AddPurchasPayment';
import  AddSalePayment  from './pages/Sales/AddSalePayment';
import Stockout from './pages/Reports/Stockout';
import Expiration from './pages/Reports/Expiration';
import AddClient from './pages/Clients/AddClient';
import AllClients from './pages/Clients/AllClients';
import Profit from './pages/Reports/Profit';
import Debt from './pages/Reports/Debt';
import Dues from './pages/Reports/Dues';
import IsAdmin from './pages/IsAdmin';
import ClientPayments from './pages/Payments/ClientPayment';
import SupplierPayments from './pages/Payments/SupplierPayment';
import NotFound from './pages/NotFound';



const  App = () => {
  
  
  return (
    
   <BrowserRouter>
   <Provider store={store}>

    {location.pathname !== '/login' &&
     <>
     <Header/><Sidebar/>
     </> 
    
    }

      <Routes>
        <Route element={<ProductedRoute/>}>
          <Route>
              <Route path="/profit" element={<Profit/>}/> 
              <Route path="/debt" element={<Debt/>}/> 
              <Route path="/duse" element={<Dues/>}/> 
              <Route path="/expiration" element={<Expiration/>}/> 
              <Route path="/stockout" element={<Stockout/>}/> 
              <Route path="/AllReturnSales" element={<AllReturnSales/>}/> 
              <Route path="/AllSalesInvoice" element={<AllSales/>}/> 
              <Route path="/AllUsers" element={<AllUsers/>}/> 
              <Route path="/AddUser" element={<AddUser/>}/> 
              <Route path="/AllReturnPurchases" element={<AllReturnPurchases/>}/> 
              <Route path="/AllPurchases" element={<AllPurchases/>}/> 
          </Route>

          <Route path="/suppliersPayment" element={<SupplierPayments/>}/> 

        <Route path="/clientsPayment" element={<ClientPayments/>}/> 

        <Route path="/purchasPayment" element={<AddPurchasPayment/>}/> 
        <Route path="/slasPayment" element={<AddSalePayment/>}/> 
          
            <Route path="/AddReturnSale" element={<AddReturnSale/>}/> 
          
            <Route path="/AddSaleInvoice" element={<AddSale/>}/> 
         
        
            <Route path="/AllClients" element={<AllClients/>}/> 
            <Route path="/AddClient" element={<AddClient/>}/> 
            <Route path="/AllSupliers" element={<AllSupliers/>}/> 
            <Route path="/AddSuplier" element={<AddSuplier/>}/> 
          
            <Route path="/AddReturnPurchas" element={<AddReturnPurchas/>}/> 
         
            <Route path="/AddPurchase" element={<AddPurchase/>}/> 
            <Route path="/AllTypes" element={<AllTypes/>}/> 
            <Route path="/addType" element={<AddType/>}/> 
            <Route path="/AllUnits" element={<AllUnits/>}/> 
            <Route path="/addUnit" element={<AddUnit/>}/> 
            <Route path="/AllCategories" element={<AllCategories/>}/> 
            <Route path="/addCategory" element={<AddCategory/>}/> 
            <Route path="/AllMedicines" element={<AllMedicines/>}/> 
            <Route path="/addMedicine" element={<AddMedicine/>}/> 
            <Route path="/" element={<Index/>}/>
        </Route>

        <Route element={<CheckLogin/>}>
          <Route path="/login" element={<Login/>}/>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>

    </Provider>
   </BrowserRouter>

  );  
}

const container = document.getElementById('root');


const root = ReactDOM.createRoot(container);
root.render(<App/>);

