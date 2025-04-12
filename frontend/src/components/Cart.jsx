import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './common/Layout'
import { CartContext } from './context/Cart'

const Cart = () => {
    const { cartData, shipping, subTotal, grandTotal, updateCartItem, removeCartItem } = useContext(CartContext)
    const [qty, setQty] = useState({});

    //handle change quantity
    const handleChangeQty = (e, itemId) => {
        let newQty = e.target.value;
        setQty(prev => ({ ...prev, [itemId]: newQty }))
        updateCartItem(itemId, newQty)
        // console.log(e.target.value, itemId)
    }

    //handle remove item from cart
    const handleRemoveCartItem = (itemId) => {
        removeCartItem(itemId)
    }

    // console.log(qty)
    return (
        <Layout>
            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Cart</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="col-md-12">
                        <h2 className="border-bottom pb-3">Cart</h2>
                        <table className="table">
                            <tbody>
                                {
                                    cartData.length == 0 && (
                                        <tr>
                                            <td colSpan={4} valign='middle' align='center'>Your Cart is Empty!</td>
                                        </tr>
                                    )
                                }

                                {cartData && cartData.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td width={50}>
                                                <img src={item.image_url} alt="product-img" width={50} />
                                            </td>
                                            <td width={600}>
                                                <h4>{item.title}</h4>
                                                <div className="d-flex align-items-center">
                                                    <span>${item.price}</span>
                                                    {item.size && <button className='btn btn-size ms-2'>{item.size}</button>}

                                                </div>
                                            </td>
                                            <td valign='middle'>
                                                <input
                                                    min={1}
                                                    max={10}
                                                    style={{ width: '100px' }}
                                                    type="number"
                                                    value={qty[item.id] || item.qty}
                                                    onChange={(e) => handleChangeQty(e, item.id)}
                                                    className='form-control' />
                                            </td>
                                            <td valign='middle'>
                                                <a href="#"
                                                    onClick={() => handleRemoveCartItem(item.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    cartData.length > 0 && (
                        <div className="row justify-content-end">
                            <div className="col-md-3">
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <span>Subtotal</span>
                                    <span>${subTotal()}</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <span>Shipping</span>
                                    <span>${shipping()}</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <strong>Grand Total</strong>
                                    <span>${grandTotal()}</span>
                                </div>

                                <div className="d-flex justify-content-end py-3">
                                    <Link to="/checkout"
                                        className='btn btn-primary'>
                                        Proceed to Checkout</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default Cart
