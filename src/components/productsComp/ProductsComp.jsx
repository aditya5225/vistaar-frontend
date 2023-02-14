import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsData } from '../../store/manageAccountsState';


const ProductsComp = () => {

    const loading = useSelector(state => state.manageAccountsState.loading);
    const productsData = useSelector(state => state.manageAccountsState.productsData);

    const dispatch = useDispatch();

    useEffect(() => {
        const queryData = ``;
        dispatch(fetchProductsData(queryData))
    }, [])

    return (
        <>
            <div
                style={{
                    height: '70vh',
                    width: '100vw',
                }}
            >
                <h6 className='text-center py-3 m-0'> <b> Products Data </b> </h6>

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
                                productsData && productsData.map((acntVal, acntInd) => {
                                    return (
                                        <div key={acntInd} className='col-2 p-2'>
                                            <div className='border bg-light d-block py-3'>
                                                <h5 className='m-0 text-center'> {acntVal} </h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default ProductsComp;