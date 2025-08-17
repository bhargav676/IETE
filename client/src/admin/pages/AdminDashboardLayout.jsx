import React from 'react';
import { Outlet } from 'react-router-dom'; 
import AdminNavbar from '../components/AdminNavbar'; 

const AdminDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <main className="">
                <Outlet /> 
            </main>
        </div>
    );
};

export default AdminDashboardLayout;