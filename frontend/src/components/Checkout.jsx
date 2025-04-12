import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl, userToken } from './common/http'
import Layout from './common/Layout'
import { CartContext } from './context/Cart'
import { toast } from 'react-toastify'


const Checkout = () => {
    const [paymentMethod, SetPaymentmethod] = useState('cod')
    const { cartData, shipping, subTotal, grandTotal, } = useContext(CartContext)
    const navigate = useNavigate();

    const handlePaymentMethod = (e) => {
        SetPaymentmethod(e.target.value);
    }

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const processOrder = (data) => {
        // console.log(data)
        if (paymentMethod == "cod") {
            saveOrder(data, 'unpaid')
        }
    }

    const saveOrder = async (formData, paymentStatus) => {
        const newFormData = {
            ...formData,
            grand_total: grandTotal(),
            sub_total: subTotal(),
            shipping: shipping(),
            discount: 0,
            payment_status: paymentStatus,
            status: 'pending',
            cart: cartData
        }

        await fetch(`${baseUrl}/save-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "Application/json",
                "Authorization": `Bearer ${userToken()}`
            },
            body: JSON.stringify(newFormData)
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                if(result.status == 200){
                    localStorage.removeItem('cart')
                    navigate(`/order/confirmation/${result.id}`)
                }else{
                    toast.error(result.message)
                }
            })
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

                <form onSubmit={handleSubmit(processOrder)}>
                    <div className="row mb-5">
                        <div className="col-md-7">
                            <h3 className='border-bottom pb-2 fw-bold'>Checkout</h3>
                            <div className='row pt-2'>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('name', {
                                                required: "The name field is required"
                                            })}
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder='name' />
                                        {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('email', {
                                                required: "The email field is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            type="text"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder='email' />
                                        {errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <textarea
                                            {...register('address', {
                                                required: "The address field is required"
                                            })}
                                            cols={3}
                                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                            placeholder='Address'></textarea>
                                        {errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('city', {
                                                required: "The city field is required"
                                            })}
                                            type="text"
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            placeholder='city' />

                                        {errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>}
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('zip', {
                                                required: "The zip field is required"
                                            })}
                                            type="text"
                                            className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                                            placeholder='zip' />
                                        {errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('mobile', {
                                                required: "The mobile field is required"
                                            })}
                                            type="text"
                                            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                            placeholder='mobile' />
                                        {errors.mobile && <p className='invalid-feedback'>{errors.phone?.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3 className='border-bottom pb-2 fw-bold'>Items</h3>

                            <table className="table">
                                <tbody>
                                    {
                                        cartData && cartData.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td width={50}>
                                                        <img src={item.image_url} alt="product-img" width={50} />
                                                    </td>
                                                    <td width={600}>
                                                        <h4>{item.title}</h4>
                                                        <div className="d-flex align-items-center">
                                                            <span>${item.price}</span>
                                                            {item.size && <button className='btn btn-size ms-2'>L</button>}

                                                            <div className='ms-2'>X {item.qty}</div>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }



                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col-md-12">
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


                                </div>
                            </div>

                            <h3 className='border-bottom pt-4 pb-2 fw-bold'>Payment Methods</h3>

                            <div className='d-flex'>
                                <div className='d-flex align-items-center'>
                                    <input id='bkash' name='bkash' type="radio" value={'bkash'}
                                        defaultChecked={paymentMethod === 'bkash'}
                                        onClick={handlePaymentMethod} />
                                    <label htmlFor="bkash" className='ps-1'>bkash</label>
                                </div>

                                <div className='d-flex align-iems-center ps-2'>
                                    <input id='cod' type="radio" name='cod' value={'cod'}
                                        defaultChecked={paymentMethod === 'cod'}
                                        onClick={handlePaymentMethod} />
                                    <label htmlFor="cod" className='ps-1'>cod</label>
                                </div>
                            </div>

                            <div className="d-flex py-2">
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>


                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Checkout
