import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CustomerAuthContext } from '../context/CustomerAuth';

const CustomerSidebar = () => {
    const { logout } = useContext(CustomerAuthContext);
    return (
        <>
            <div className="card shadow mb-5 sidebar">
                <div className="card-body p-4">
                    <ul>
                        <li><Link to="/account">Account</Link></li>
                        <li><a to="">Orders</a></li>
                        <li><a href="">Change Password</a></li>
                        <li><a href="#" onClick={logout}>Logout</a></li>

                    </ul>
                </div>
            </div>

        </>
    )
}

export default CustomerSidebar
