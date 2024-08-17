import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppState, AppDispatch } from './store';


export const useAppSelector : TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch : () => AppDispatch  = useDispatch;