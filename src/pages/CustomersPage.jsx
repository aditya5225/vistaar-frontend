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
    // const dataCount = useSelector(state => state.manageCustomersState.dataCount);
    const dataCount = 410
    const numberOfTabs = 10;

    const [limitData, setLimitData] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [currentSeries, setCurrentSeries] = useState(1)
    const dispatch = useDispatch();

    const totalSkippedData = (currentSeries - 1) * numberOfTabs
    let limitPage = (dataCount - totalSkippedData) / 10 > numberOfTabs ? numberOfTabs : (dataCount - totalSkippedData) / 10;

    console.log((dataCount - totalSkippedData) / 10)

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
                                let currentSrc = currentSeries - limitData;
                                if (currentSrc >= 0) {
                                    setCurrentSeries(currentSrc)
                                    setPageNumber(currentSrc)
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
                                        active={pageNumber == currentSeries + ind ? true : false}
                                        onClick={() => {
                                            setPageNumber(currentSeries + ind)
                                        }}
                                    >
                                        <PaginationLink> {currentSeries + ind} </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem
                            onClick={() => {
                                let currentSrc = currentSeries + limitData;
                                if (currentSrc < (dataCount / limitData)) {
                                    setCurrentSeries(currentSrc)
                                    setPageNumber(currentSrc)
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