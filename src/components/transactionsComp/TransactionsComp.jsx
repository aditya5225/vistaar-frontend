import React, { useEffect, useState } from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactionsData } from '../../store/manageTransactionsState';
import moment from 'moment';
import { Link } from "react-router-dom";
import CustomPagination from '../../container/customComponent/CustomPagination';


const TransactionsComp = (props) => {

    const loading = useSelector(state => state.manageTransactionsState.loading);
    const transactionsData = useSelector(state => state.manageTransactionsState.transactionsData);

    const numberOfTabs = 10;

    const [limitData, setLimitData] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (location.state && location.state.accountNo) {
            const queryData = `account_id=${location.state.accountNo}`;
            dispatch(fetchTransactionsData(queryData))
        }
    }, [])

    return (
        <>
            {
                location.state && location.state.customerDets && location.state.accountNo ?
                    <div>
                        {
                            loading ? <div
                                style={{
                                    height: '100vh',
                                    width: '100vw',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <span> ...Loading </span>
                            </div>
                                : <div>
                                    <div className='border bg-light py-3 px-4'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Link to={`/customers`} className='text-decoration-none'> <h6> {`<Back`} </h6> </Link>
                                            <h5> Transactions </h5>
                                            <h6> Account Number: <b> {location.state.accountNo} </b> </h6>
                                        </div>
                                        <div>
                                            <p> Name: {location.state.customerDets.name} </p>
                                            <p> Username: {location.state.customerDets.username} </p>
                                            <p> Email: {location.state.customerDets.email} </p>
                                            <p> Address: {location.state.customerDets.address} </p>
                                            <p> Date of birth: {moment(location.state.customerDets.birthdate).format('DD-MM-YYYY')} </p>
                                        </div>
                                    </div>
                                    {
                                        transactionsData ?
                                            <div className='mt-4'>
                                                <div className='d-flex justify-content-between align-items-center px-3'>
                                                    <p> Transactions Date: {moment(transactionsData.bucket_start_date).format('DD-MM-YYYY')} To {moment(transactionsData.bucket_end_date).format('DD-MM-YYYY')} </p>
                                                    <p> Total Transactions: {transactionsData.transaction_count} </p>
                                                </div>

                                                <Table striped className='border-top'>
                                                    <thead>
                                                        <tr>
                                                            <th> # </th>
                                                            <th> Date </th>
                                                            <th> Transaction Code </th>
                                                            <th> Symbol </th>
                                                            <th> Amount </th>
                                                            <th> Price </th>
                                                            <th> Total </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            transactionsData.transactions && transactionsData.transactions.slice(((pageNumber - 1) * limitData), ((pageNumber - 1) * limitData) + 10).map((trnsVal, trnsInd) => {
                                                                return (
                                                                    <tr key={trnsVal._id}>
                                                                        <td> {trnsInd + 1} </td>
                                                                        <td> {moment(trnsVal.name).format('DD-MM-YYYY')} </td>
                                                                        <td> {trnsVal.transaction_code.toUpperCase()} </td>
                                                                        <td> {trnsVal.symbol} </td>
                                                                        <td> {parseFloat(trnsVal.amount).toFixed(2)} </td>
                                                                        <td> {parseFloat(trnsVal.price).toFixed(2)} </td>
                                                                        <td> {parseFloat(trnsVal.total).toFixed(2)} </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>

                                                <CustomPagination
                                                    totalDataCount={transactionsData.transaction_count}
                                                    limitData={limitData}
                                                    pageNumber={pageNumber}
                                                    setPageNumber={setPageNumber}
                                                    numberOfTabs={numberOfTabs}
                                                />
                                            </div>
                                            : <div className='mt-5 text-center' >
                                                No Transactions
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                    : <> {navigate("/customers")} </>
            }
        </>
    )
}

export default TransactionsComp;