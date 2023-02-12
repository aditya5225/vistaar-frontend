import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CustomersPage from '../pages/CustomersPage'

const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="*" element={<Navigate to="/customers" replace />} />
            </Routes>
        </>
    )
}

export default MainRoutes;