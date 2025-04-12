import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { adminToken, baseUrl } from '../../common/http'
import Layout from '../../common/Layout'
import Loader from '../../common/Loader'
import NotFound from '../../common/NotFound'
import Sidebar from '../../common/Sidebar'

const OrderDetail = () => {
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(false);
    const params = useParams()

    const fetchOrder = async () => {
        setLoader(true)
        const res = await fetch(`${baseUrl}/orders/${params.id}`, {
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
                    setOrder(result.data);
                    setItems(result.data.items)
                } else {
                    console.log('Something went wrong');
                }
            });
        // return res;
    }


    useEffect(() => {
        fetchOrder();
    }, [params.id]);

    console.log(order)

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Orders / Detail</h4>
                        <Link to="/admin/orders" className="btn btn-dark">Back</Link>

                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row mb-5">

                            <div className="col-md-9">
                                <div className="card shadow">
                                    <div className="card-body p-4">
                                        {loader && <Loader />}

                                        {
                                            (!loader && order) ? (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <h4>Order ID: # {order.id}</h4>
                                                            {order.status == "pending" && <span className='badge bg-warning'>Pending</span>}
                                                            {order.status == "shipped" && <span className='badge bg-info'>Shipped</span>}
                                                            {order.status == "delivered" && <span className='badge bg-success'>Delivered</span>}
                                                            {order.status == "cancelled" && <span className='badge bg-danger'>Cancelled</span>}
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className='text-secondary'>Date</div>
                                                            <h4 className='pt-2'>{order.created_at}</h4>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className='text-secondary'>Payment Status</div>
                                                            {order.payment_status == 'paid' ?
                                                                <span className='badge text-bg-success'>Paid</span> :

                                                                <span className='badge text-bg-danger'>Unpaid</span>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="py-5">
                                                                <strong>{order.name}</strong>
                                                                <div>{order.email}</div>
                                                                <div>{order.mobile}</div>
                                                                <div>{order.address}, {order.city} {order.zip}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className='text-secondary pt-5'>Payment Method</div>
                                                            <p>COD</p>
                                                        </div>
                                                        <div className="col-md-4"></div>
                                                    </div>

                                                    <div class="row pt-5">
                                                        <h3 class="pb-2 "><strong>Items</strong></h3>
                                                        {items && items.map(item => {
                                                            return (
                                                                <div key={item.id} class="row justify-content-end">
                                                                    <div class="col-lg-12">
                                                                        <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                            <div class="d-flex">
                                                                                {item.product.image_url &&

                                                                                    <img
                                                                                        width="70"
                                                                                        class="me-3"
                                                                                        src={item.product.image_url}
                                                                                        alt="" />
                                                                                }
                                                                                <div class="d-flex flex-column">
                                                                                    <div class="mb-2"><span>{item.name}</span></div>
                                                                                    <div>
                                                                                        {item.size && <button class="btn btn-size">{item.size}</button>}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="d-flex">
                                                                                <div>X {item.qty}</div>
                                                                                <div class="ps-3">${item.price}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}

                                                        <div class="row justify-content-end">
                                                            <div class="col-lg-12">
                                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                    <div>Subtotal</div>
                                                                    <div>${order.sub_total}</div>
                                                                </div>
                                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                    <div>Shipping</div>
                                                                    <div>${order.shipping}</div>
                                                                </div>
                                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                    <div><strong>Grand Total</strong></div>
                                                                    <div>${order.grand_total}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) :
                                                (
                                                    <div className="row">
                                                        <NotFound text='Order Not Found' />
                                                    </div>
                                                )
                                        }




                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card shadow">
                                    <div className="card-body p-4">

                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <NotFound text='Order not found' />
                                    </div>
                                </div>
                            </div>



                        </div>

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default OrderDetail
