import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import   {useCheckLoginQuery} from '../services/medicines/medicines';


 const CheckLogin = () => {

//const checkLogin  =   useCheckLoginQuery();

const auth =  localStorage.getItem("token") && true;

  return (
    auth  ?  window.location.href = '/' : <Outlet/>
  )
}
export default CheckLogin;