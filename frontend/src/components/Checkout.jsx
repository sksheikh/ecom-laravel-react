import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/mens/six.jpg'
import Layout from './common/Layout'


const Checkout = () => {
    const [paymetMethod, SetPaymentmethod] = useState('cod')
    const handlePaymentMethod = (e) => {
        SetPaymentmethod(e.target.value);
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-7">
                        <h3 className='border-bottom pb-2 fw-bold'>Checkout</h3>
                        <div className='row pt-2'>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='name' />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='email' />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="mb-3">
                                    <textarea name="" cols={3} className='form-control' id="" placeholder='Address'></textarea>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='city' />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='state' />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='zip' />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='phone' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h3 className='border-bottom pb-2 fw-bold'>Items</h3>

                        <table className="table">
                            <tbody>
                                <tr>
                                    <td width={50}>
                                        <img src={ProductImg} alt="product-img" width={50} />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy Product Title</h4>
                                        <div className="d-flex align-items-center">
                                            <span>$10</span>
                                            <button className='btn btn-size ms-2'>L</button>
                                            <div className='ms-2'>X 1</div>
                                        </div>
                                    </td>

                                </tr>

                                <tr>
                                    <td width={50}>
                                        <img src={ProductImg} alt="product-img" width={50} />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy Product Title</h4>
                                        <div className="d-flex align-items-center">
                                            <span>$10</span>
                                            <button className='btn btn-size ms-2'>L</button>
                                            <div className='ms-2'>X 1</div>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <span>Subtotal</span>
                                    <span>$20</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <span>Shipping</span>
                                    <span>$05</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <strong>Grand Total</strong>
                                    <span>$25</span>
                                </div>


                            </div>
                        </div>

                        <h3 className='border-bottom pt-4 pb-2 fw-bold'>Payment Methods</h3>

                        <div className='d-flex'>
                            <div className='d-flex align-items-center'>
                                <input id='bkash' name='bkash' type="radio" value={'bkash'}
                                checked={paymetMethod === 'bkash'}
                                onClick={handlePaymentMethod} />
                                <label htmlFor="bkash" className='ps-1'>bkash</label>
                            </div>

                            <div className='d-flex align-iems-center ps-2'>
                                <input id='cod' type="radio" name='cod' value={'cod'}
                                checked={paymetMethod === 'cod'}
                                onClick={handlePaymentMethod} />
                                <label htmlFor="cod" className='ps-1'>cod</label>
                            </div>
                        </div>

                        <div className="d-flex py-2">
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout
