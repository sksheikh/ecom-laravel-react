import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminToken, baseUrl } from '../../common/http';
import Layout from '../../common/Layout';
import Loader from '../../common/Loader';
import NotFound from '../../common/NotFound';
import Sidebar from '../../common/Sidebar';

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetchOrders = async () => {
        setLoader(true)
        const res = await fetch(`${baseUrl}/orders`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                setLoader(false)
                // console.log(result)
                if (result.status == 200) {
                    setOrders(result.data);
                } else {
                    console.log('Something went wrong');
                }
            });
        // return res;
    }


    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Orders</h4>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                {loader && <Loader />}
                                {!loader && orders.length > 0 &&
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th width="50">SL</th>
                                                <th>Customer</th>
                                                <th>Email</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th width="100">Payment Status</th>
                                                <th width="100">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, key) => (
                                                <tr key={order.id} className='align-middle'>
                                                    <td>
                                                        <Link to={`/admin/orders/${order.id}`}>
                                                            {key + 1}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {order.name}
                                                    </td>
                                                    <td>{order.email}</td>
                                                    <td>${order.grand_total}</td>
                                                    <td>{order.created_at}</td>
                                                    <td>
                                                        {order.payment_status == 'paid' ?
                                                            <span className='badge text-bg-success'>Paid</span> :

                                                            <span className='badge text-bg-danger'>Unpaid</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        {order.status == "pending" && <span className='badge bg-warning'>Pending</span>}
                                                        {order.status == "shipped" && <span className='badge bg-info'>Shipped</span>}
                                                        {order.status == "delivered" && <span className='badge bg-success'>Delivered</span>}
                                                        {order.status == "cancelled" && <span className='badge bg-danger'>Cancelled</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table> 
                                }

                                {!loader && orders.length == 0 &&
                                     <NotFound text='orders not found!' />
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default ShowOrders
