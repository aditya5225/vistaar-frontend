import { combineReducers } from 'redux';

import manageCustomersState from '../store/manageCustomersState'
import manageTransactionsState from '../store/manageTransactionsState'
import manageAccountsState from '../store/manageAccountsState'

const rootReducer = combineReducers({
	manageCustomersState,
	manageTransactionsState,
	manageAccountsState
})


export default rootReducer;