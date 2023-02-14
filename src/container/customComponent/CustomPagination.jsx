import React, { useState } from "react";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';

const CustomPagination = (props) => {
    const {
        totalDataCount = 0,
        limitData = 10,
        pageNumber,
        setPageNumber,
        numberOfTabs = 10,
        loading = false,
    } = props

    const [currentSeries, setCurrentSeries] = useState(1)

    const totalSkippedData = (currentSeries - 1) * limitData
    let limitPage = Math.ceil((totalDataCount - totalSkippedData) / numberOfTabs > numberOfTabs ? numberOfTabs : (totalDataCount - totalSkippedData) / limitData);

    return (
        <>
            {
                pageNumber && setPageNumber && limitData < totalDataCount ?
                    <Pagination>
                        <PaginationItem
                            onClick={() => {
                                if (!loading) {
                                    if (totalDataCount > (numberOfTabs * numberOfTabs)) {
                                        let currentSrc = currentSeries - numberOfTabs;
                                        if (currentSrc >= 0) {
                                            setCurrentSeries(currentSrc)
                                            setPageNumber(currentSrc)
                                        }
                                    }
                                    else {
                                        if (pageNumber > 1) {
                                            setPageNumber(pageNumber - 1)
                                        }
                                    }
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
                                            if (!loading) {
                                                setPageNumber(currentSeries + ind)
                                            }
                                        }}
                                    >
                                        <PaginationLink> {currentSeries + ind} </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem
                            onClick={() => {
                                if (!loading) {
                                    if (totalDataCount > (numberOfTabs * numberOfTabs)) {
                                        let currentSrc = currentSeries + numberOfTabs;
                                        if (currentSrc <= (totalDataCount / limitData)) {
                                            setCurrentSeries(currentSrc)
                                            setPageNumber(currentSrc)
                                        }
                                    }
                                    else {
                                        if (pageNumber < limitPage) {
                                            setPageNumber(pageNumber + 1)
                                        }
                                    }
                                }
                            }}
                        >
                            <PaginationLink next />
                        </PaginationItem>
                    </Pagination>
                    : null
            }
        </>
    )
}

export default CustomPagination;