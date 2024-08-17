import React from 'react'
import {Outlet, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {loginSlice} from '../features/loginSlice';
import { useGetUserByTokenQuery } from '../services/medicines/medicines';
import { useEffect } from 'react';

  const ProductedRoute = () => {

  const dispatch = useAppDispatch();

  const auth =  localStorage.getItem("token") && true;

  const login = useAppSelector((state) => state.login.auth);

  const checkLogin  =  useGetUserByTokenQuery();
  const user = checkLogin?.data?.data?.user
console.log(checkLogin);

  useEffect(()=>{
  dispatch(loginSlice({
      'auth': true,
      'id': user?.id,
      'name':user?.name,
      'role':user?.role,
      'phone':user?.phone,
    })) 

  }, [checkLogin.isSuccess])

  checkLogin.isError && localStorage.removeItem("token") 
  

return (
  auth ? <Outlet/> :  window.location.href = '/login' 

  )
}
export default ProductedRoute;