import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

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
                    reset({
                        status: result.data.status,
                        payment_status: result.data.payment_status
                    })
                } else {
                    console.log('Something went wrong');
                }
            });
        // return res;
    }

    const updateOrder = async (data) => {
        setLoader(true)
        const res = await fetch(`${baseUrl}/update-order/${params.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)

        }).then(res => res.json())
            .then(result => {
                setLoader(false)
                // console.log(result)
                if (result.status == 200) {
                    toast.success(result.message)
                    setOrder(result.data);
                    reset({
                        status: result.data.status,
                        payment_status: result.data.payment_status
                    })
                } else {
                    console.log('Something went wrong');
                }
            });
        // return res;
    }


    useEffect(() => {
        fetchOrder();
    }, [params.id]);

    // console.log(order)

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
                                            !loader && order && (
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

                                                    <div className="row pt-5">
                                                        <h3 className="pb-2 "><strong>Items</strong></h3>
                                                        {items && items.map(item => {
                                                            return (
                                                                <div key={item.id} className="row justify-content-end">
                                                                    <div className="col-lg-12">
                                                                        <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                            <div className="d-flex">
                                                                                {item.product.image_url &&

                                                                                    <img
                                                                                        width="70"
                                                                                        className="me-3"
                                                                                        src={item.product.image_url}
                                                                                        alt="" />
                                                                                }
                                                                                <div className="d-flex flex-column">
                                                                                    <div className="mb-2"><span>{item.name}</span></div>
                                                                                    <div>
                                                                                        {item.size && <button className="btn btn-size">{item.size}</button>}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex">
                                                                                <div>X {item.qty}</div>
                                                                                <div className="ps-3">${item.price}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}

                                                        <div className="row justify-content-end">
                                                            <div className="col-lg-12">
                                                                <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                    <div>Subtotal</div>
                                                                    <div>${order.sub_total}</div>
                                                                </div>
                                                                <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                    <div>Shipping</div>
                                                                    <div>${order.shipping}</div>
                                                                </div>
                                                                <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                                    <div><strong>Grand Total</strong></div>
                                                                    <div>${order.grand_total}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )

                                        }
                                        {
                                            !loader && order == null &&
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
                                        <form onSubmit={handleSubmit(updateOrder)}>
                                            <div className="mb-3">
                                                <label htmlFor="status" className='form-label'>Status</label>
                                                <select
                                                    {...register('status', { required: true })}
                                                    id="status" className='form-select'>
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="payment_status" className='form-label'>Payment Status</label>
                                                <select
                                                    {...register('payment_status', { required: true })}
                                                    id="payment_status" className='form-select'>
                                                    <option value="paid">Paid</option>
                                                    <option value="unpaid">Unpaid</option>
                                                </select>
                                            </div>

                                            <button type='submit' className='btn btn-primary'>Update</button>
                                        </form>
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
