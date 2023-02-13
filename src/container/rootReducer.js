import { combineReducers } from 'redux';

import manageCustomersState from '../store/manageCustomersState'
import manageTransactionsState from '../store/manageTransactionsState'

const rootReducer = combineReducers({
	manageCustomersState,
	manageTransactionsState
})


export default rootReducer;