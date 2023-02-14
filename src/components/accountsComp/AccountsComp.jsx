import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccountsData } from '../../store/manageAccountsState';
import moment from 'moment';
import { Link } from "react-router-dom";
import CustomPagination from '../../container/customComponent/CustomPagination';


const AccountsComp = (props) => {

    const loading = useSelector(state => state.manageAccountsState.loading);
    const accountsData = useSelector(state => state.manageAccountsState.accountsData);
    const dataCount = useSelector(state => state.manageAccountsState.dataCount);

    const numberOfTabs = 10;

    const [limitData, setLimitData] = useState(24)
    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch();

    useEffect(() => {
        const queryData = `limit=${limitData}&skip=${pageNumber}&amount=5000`;
        dispatch(fetchAccountsData(queryData))
    }, [limitData, pageNumber])

    return (
        <>
            <div
                style={{
                    height: '70vh',
                    width: '100vw',
                }}
            >
                <h6 className='text-center py-3 m-0'> <b> Accounts Data </b> </h6>
                {
                    loading ? <div
                        className='w-100 h-100'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <span> ...Loading </span>
                    </div>
                        : <div className='row p-4 m-0 text-center'>
                            {
                                accountsData && accountsData.map(acntVal => {
                                    return (
                                        <div key={acntVal._id} className='col-2 p-2'>
                                            <Link
                                                className='text-decoration-none border bg-light d-block py-3'
                                                to={`/transactions`}
                                                state={{ accountNo: acntVal.account_id }}
                                            >
                                                <h5 className='m-0 text-center'> {acntVal.account_id} </h5>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
            <CustomPagination
                totalDataCount={dataCount}
                limitData={limitData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                numberOfTabs={numberOfTabs}
                loading={loading}
            />
        </>
    )
}

export default AccountsComp;