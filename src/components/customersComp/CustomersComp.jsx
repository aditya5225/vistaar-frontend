import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomersData } from '../../store/manageCustomersState';
import CustomPagination from '../../container/customComponent/CustomPagination';


const CustomersComp = () => {
    const loading = useSelector(state => state.manageCustomersState.loading);
    const customersData = useSelector(state => state.manageCustomersState.customersData);
    const dataCount = useSelector(state => state.manageCustomersState.dataCount);

    const numberOfTabs = 10;

    const [limitData, setLimitData] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useDispatch();


    useEffect(() => {
        const queryData = `limit=${limitData}&skip=${pageNumber}&active=true`;
        dispatch(fetchCustomersData(queryData))
    }, [limitData, pageNumber])

    return (
        <div>
            {
                loading ? <div
                    style={{
                        height: '70vh',
                        width: '100vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span> ...Loading </span>
                </div>
                    : <>
                        <div className='text-center p-3 bg-light'>
                            <h5> Customers Data </h5>
                        </div>

                        <Table striped>
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Name </th>
                                    <th> Address </th>
                                    <th> Accounts </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    customersData.map((cstmVal, cstmInd) => {
                                        return (
                                            <tr key={cstmVal._id}>
                                                <td> {cstmInd + 1} </td>
                                                <td> {cstmVal.name} </td>
                                                <td> {cstmVal.address} </td>
                                                <td>
                                                    {
                                                        cstmVal.accounts.map((acntVal, acntInd) => {
                                                            return (
                                                                <Link
                                                                    key={acntInd}
                                                                    to={`/transactions`}
                                                                    state={{ accountNo: acntVal }}
                                                                >
                                                                    <span
                                                                        className='mx-1'
                                                                    >{acntVal}{cstmVal.accounts.length - 1 > acntInd ? ',' : ''}</span>
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </>
            }

            <CustomPagination
                totalDataCount={dataCount}
                limitData={limitData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                numberOfTabs={numberOfTabs}
                loading={loading}
            />
        </div>
    )
}

export default CustomersComp;