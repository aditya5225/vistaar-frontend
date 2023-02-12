import React, { useEffect, useState } from 'react';
import {
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomersData } from '../store/manageCustomersState'

const CustomersPage = () => {
    const customersData = useSelector(state => state.manageCustomersState.customersData);
    const dataCount = useSelector(state => state.manageCustomersState.dataCount);

    const [limitData, setLimitData] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useDispatch();
    console.log(pageNumber)

    let limitPage = dataCount > 10 ? 10 : dataCount;
    let skipTab = 2;
    let startPage = 0;
    let endPage = limitPage;

    useEffect(() => {
        const queryData = `limit=${limitData}&skip=${pageNumber}`;
        dispatch(fetchCustomersData(queryData))
    }, [limitData, pageNumber])

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Address </th>
                        <th> Accounts </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        customersData.map(cstmVal => {
                            return (
                                <tr key={cstmVal._id}>
                                    <td> {cstmVal.name} </td>
                                    <td> {cstmVal.address} </td>
                                    <td>
                                        {
                                            cstmVal.accounts.map((acntVal, acntInd) => {
                                                return (
                                                    <span
                                                        className='text-primary'
                                                        key={acntInd}
                                                    > {acntVal}{cstmVal.accounts.length - 1 > acntInd ? ',' : ''} </span>
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

            {
                customersData && customersData.length ?
                    <Pagination>
                        <PaginationItem
                            onClick={() => {
                                if (pageNumber > 1) {
                                    setPageNumber(pageNumber - 1)
                                }
                            }}
                        >
                            <PaginationLink previous />
                        </PaginationItem>
                        {
                            Array(limitPage).fill(0).map((num, ind) => {
                                return (
                                    <PaginationItem
                                        key={ind}
                                        active={pageNumber == ind + 1 ? true : false}
                                        onClick={() => {
                                            setPageNumber(ind + 1)
                                        }}
                                    >
                                        <PaginationLink> {ind + 1} </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem
                            onClick={() => {
                                if (pageNumber < limitPage) {
                                    setPageNumber(pageNumber + 1)
                                }
                            }}
                        >
                            <PaginationLink next />
                        </PaginationItem>
                    </Pagination>
                    : null
            }
        </div>
    )
}

export default CustomersPage;