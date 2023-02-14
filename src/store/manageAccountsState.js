import { createSlice } from '@reduxjs/toolkit';
import HTTPClient from '../utils/HTTPClient'
import apiList from '../utils/apiList'

export const manageAccountsState = createSlice({
    name: 'manageAccountsState',
    initialState: {
        loading: false,
        error: null,
        errorMsg: null,
        successMsg: null,
        accountsData: [],
        dataCount: 0,
        productsData: [],
    },

    reducers: {

        loadAccountsStateData: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },

        failedAccountsStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.message,
            }
        },


        successAccountsStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: false,
                successMsg: action.payload.message,
                accountsData: action.payload.data.accountsData,
                dataCount: action.payload.data.dataCount,
            }
        },

        successProductsStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: false,
                successMsg: action.payload.message,
                productsData: action.payload.data.productsData,
            }
        },
    },
});

export const {
    loadAccountsStateData,
    failedAccountsStateData,
    successAccountsStateData,
    successProductsStateData
} = manageAccountsState.actions;


export const fetchAccountsData = (queryData) => dispatch => {
    dispatch(loadAccountsStateData());

    HTTPClient.get(apiList.fetchAccounts, queryData, (response) => {
        if (response) {
            if (!response.error) {
                dispatch(successAccountsStateData({ message: response.message, data: response.result }));
            } else {
                dispatch(failedAccountsStateData({ message: response.message }));
            }
        } else {
            console.log('Internal error')
        }

    });
};

export const fetchProductsData = (queryData) => dispatch => {
    dispatch(loadAccountsStateData());

    HTTPClient.get(apiList.fetchProducts, queryData, (response) => {
        if (response) {
            if (!response.error) {
                dispatch(successProductsStateData({ message: response.message, data: response.result }));
            } else {
                dispatch(failedAccountsStateData({ message: response.message }));
            }
        } else {
            console.log('Internal error')
        }

    });
};

export default manageAccountsState.reducer;