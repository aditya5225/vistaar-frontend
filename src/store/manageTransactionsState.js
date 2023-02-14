import { createSlice } from '@reduxjs/toolkit';
import HTTPClient from '../utils/HTTPClient'
import apiList from '../utils/apiList'

export const manageTransactionsState = createSlice({
    name: 'manageTransactionsState',
    initialState: {
        loading: false,
        error: null,
        errorMsg: null,
        successMsg: null,
        transactionsData: null,
        customerData: null,
    },

    reducers: {

        loadTransactionsStateData: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },

        failedTransactionsStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.message,
            }
        },


        successTransactionsStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: false,
                successMsg: action.payload.message,
                transactionsData: action.payload.data.transactionsData,
                customerData: action.payload.data.customerData,
            }
        },
    },
});

export const { loadTransactionsStateData, failedTransactionsStateData, successTransactionsStateData } = manageTransactionsState.actions;


export const fetchTransactionsData = (queryData) => dispatch => {
    dispatch(loadTransactionsStateData());

    HTTPClient.get(apiList.fetchTransactions, queryData, (response) => {
        if (response) {
            if (!response.error) {
                dispatch(successTransactionsStateData({ message: response.message, data: response.result }));
            } else {
                dispatch(failedTransactionsStateData({ message: response.message }));
            }
        } else {
            console.log('Internal error')
        }

    });
};

export default manageTransactionsState.reducer;