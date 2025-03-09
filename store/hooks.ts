import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IRootState } from './index';
import { AppDispatch } from './types';

// Use these typed hooks instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector; 