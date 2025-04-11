import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from './common/http';
import Layout from './common/Layout';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)
        const res = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                // console.log(result)

                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/account/login')
                } else {
                    const formErrors = result.errors;
                    Object.keys(formErrors).forEach(field => {
                        setError(field, { message: formErrors[field][0] });
                    })
                }
            })
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center py-5">
                <div className="card shadow border-0 login">
                    <div className="card-body p-4">
                        <h3 className='border-bottom mb-3 pb-2'>Register Here</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className='form-label'
                                >Name</label>
                                <input
                                    {
                                    ...register('name', {
                                        required: 'The name field is required',
                                    })
                                    }
                                    id='name'
                                    type="text"
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                    placeholder='Name' />
                                {
                                    errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                }
                            </div>

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
                                <span>Already have an account?</span> &nbsp;
                                <Link to="/account/login" className='text-decoration-underline'>Login</Link>
                            </div>

                            <button className='btn btn-secondary'>Register</button>
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Register
