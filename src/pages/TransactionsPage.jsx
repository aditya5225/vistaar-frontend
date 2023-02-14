import React from 'react';
import TransactionsComp from '../components/transactionsComp/TransactionsComp'
import NavBarHeader from '../container/navBar/NavBarHeader'

const TransactionsPage = () => {

    return (
        <>
            <NavBarHeader />
            <TransactionsComp />
        </>
    )
}

export default TransactionsPage;