import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { baseUrl, userToken } from './common/http'
import Layout from './common/Layout'
import Loader from './common/Loader'

const Confirmation = () => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const [items, setItems] = useState([])

  const fetchOrder = async () => {
    await fetch(`${baseUrl}/get-order-details/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${userToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        setLoading(false)
        if (result.status == 200) {
          setOrder(result.data)
          setItems(result.data.items)
        } else {
          console.log(result.message)
        }
      })
  }

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  console.log(order)
  return (
    <Layout>
      <div className="container py-5">
        {loading && <Loader />}

        {
          !loading && order &&
          (<div>
            <div className="row">
              <h1 className='text-center fw-bold text-success'>Thank You!</h1>
              <p className='text-muted text-center'>Your order has been successfully placed.</p>
            </div>

            <div className="card shadow">
              <div className="card-body">
                <h3 className='fw-bold'>Order Summary</h3>
                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Order ID: </strong># {order.id}</p>
                    <p><strong>Date: </strong>{order.created_at}</p>
                    <p><strong>Status: </strong>
                      {order.status == "pending" && <span className='badge bg-warning'>Pending</span>}
                      {order.status == "shipped" && <span className='badge bg-info'>Shipped</span>}
                      {order.status == "delivered" && <span className='badge bg-success'>Delivered</span>}
                      {order.status == "cancelled" && <span className='badge bg-danger'>Cancelled</span>}
                    </p>
                    <p><strong>Payment Method: </strong>COD</p>
                  </div>

                  <div className="col-md-6">
                    <p><strong>Customer: </strong>{order.name}</p>
                    <p><strong>Address: </strong>{order.address}, {order.city} {order.zip}</p>
                    <p><strong>Contact: </strong>{order.mobile}</p>
                  </div>
                </div>

                <h4 className='fw-bold'>Items</h4>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <table className='table-striped table-bordered table'>
                      <thead className='table-light'>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th width="150">Price</th>
                          <th width="150">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items && items.map(item => {
                          return (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.qty}</td>
                              <td>${item.unit_price}</td>
                              <td>${item.price}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className='text-end fw-bold' colSpan={3}>Subtotal</td>
                          <td>${order.sub_total}</td>
                        </tr>
                        <tr>
                          <td className='text-end fw-bold' colSpan={3}>Shipping</td>
                          <td>${order.shipping}</td>
                        </tr>
                        <tr>
                          <td className='text-end fw-bold' colSpan={3}>Grand Total</td>
                          <td>${order.grand_total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="text-center">
                    <button className="btn btn-primary">View Order Details</button>
                    <Link
                      to={'/'}
                      className="btn btn-outline-secondary ms-2"
                    >Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        }

        {

          !loading && !order &&
          (<div className='row'>
            <h1 className='text-center fw-bold text-muted'>Order Not Found!</h1>
          </div >)
        }
      </div>
    </Layout>
  )
}

export default Confirmation
