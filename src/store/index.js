import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';

export default configureStore({
    reducer:{
        homeReducer: homeReducer,
        modalReducer: modalReducer,
        authReducer: authReducer
    }
})
