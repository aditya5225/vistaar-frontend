import { createSlice } from '@reduxjs/toolkit';
import HTTPClient from '../utils/HTTPClient'
import apiList from '../utils/apiList'

export const manageCustomersState = createSlice({
    name: 'manageCustomersState',
    initialState: {
        loading: false,
        error: null,
        errorMsg: null,
        successMsg: null,
        customersData: [],
        dataCount: 0,
    },

    reducers: {

        loadCustomersStateData: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },

        failedCustomersStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.message,
            }
        },


        successCustomersStateData: (state, action) => {
            return {
                ...state,
                loading: false,
                error: false,
                successMsg: action.payload.message,
                customersData: action.payload.data.customersData,
                dataCount: action.payload.data.dataCount,
            }
        },
    },
});

export const { loadCustomersStateData, failedCustomersStateData, successCustomersStateData } = manageCustomersState.actions;


export const fetchCustomersData = (queryData) => dispatch => {
    dispatch(loadCustomersStateData());

    HTTPClient.get(apiList.fetchCustomers, queryData, (response) => {
        if (response) {
            if (!response.error) {
                dispatch(successCustomersStateData({ message: response.message, data: response.result }));
            } else {
                dispatch(failedCustomersStateData({ message: response.message }));
            }
        } else {
            console.log('Internal error')
        }

    });
};

export default manageCustomersState.reducer;