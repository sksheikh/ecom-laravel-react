import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from './common/Layout'
import { baseUrl } from './common/http'
import { CustomerAuthContext } from './context/CustomerAuth'

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(CustomerAuthContext)
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                // console.log(result)

                if (result.status == 200) {
                    const customerInfo = {
                        token: result.token,
                        id: result.id,
                        name: result.name
                    }

                    localStorage.setItem('customerInfo', JSON.stringify(customerInfo))
                    login(customerInfo)
                    navigate('/account')
                } else {
                    // const formErrors = result.errors;
                    // Object.keys(formErrors).forEach(field => {
                    //     setError(field, { message: formErrors[field][0] });
                    // })
                    toast.error(result.message)
                }
            })
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center py-5">
                <div className="card shadow border-0 login">
                    <div className="card-body p-4">
                        <h3 className='border-bottom mb-3 pb-2'>Login Here</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="" className='form-label'>Email</label>
                                <input
                                    {
                                    ...register('email', {
                                        required: 'The email field is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address"
                                        }
                                    })
                                    }
                                    type="text"
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    placeholder='Email' />
                                {
                                    errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className='form-label'>Password</label>
                                <input
                                    {
                                    ...register('password', {
                                        required: 'The password field is required'
                                    })
                                    }
                                    type="password"
                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                    placeholder='Password' />
                                {
                                    errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                }
                            </div>
                            <div className='mb-3'>
                                <span>Don't have an account?</span> &nbsp;
                                <Link to="/account/register" className='text-decoration-underline'>Register</Link>
                            </div>

                            <button className='btn btn-secondary'>Login</button>
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Login
