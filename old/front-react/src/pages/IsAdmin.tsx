import React from 'react'
import {Outlet,  useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {loginSlice} from '../features/loginSlice';
import { useGetUserByTokenQuery } from '../services/medicines/medicines';
import { useEffect } from 'react';

const IsAdmin = () => {

    const navigate = useNavigate();


  const login = useAppSelector((state) => state.login.auth);
console.log(login);

return (
    login.role == 1 ? <Outlet/> : navigate('/')
  )
}
export default IsAdmin;