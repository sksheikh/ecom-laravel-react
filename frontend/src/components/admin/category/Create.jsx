import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { adminToken, baseUrl } from '../../common/http'

const Create = () => {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const createCategory = async (data) => {
        console.log(data)
        setDisable(true)
        const res = await fetch(`${baseUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setDisable(false)
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/categories')
                } else {
                    toast.error(result.message || 'Something went wrong!')
                }
            })
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Categories / Create</h4>
                        <Link to="/admin/categories" className="btn btn-dark">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(createCategory)}>
                            <div className="card shadow">
                                <div className="card-body p-4">

                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className='form-label'>Name</label>
                                        <input
                                            {...register('name', {
                                                required: 'The name field is required',
                                            })}
                                            id='name'
                                            type="text"
                                            placeholder='Name'
                                            className={`form-control ${errors.name && 'is-invalid'}`} />

                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="status" className='form-label'>Status</label>
                                        <select
                                            {...register('status', {
                                                required: 'Please select a status'
                                            })}
                                            name="status"
                                            id="status"
                                            className={`form-control ${errors.status && 'is-invalid'}`}>
                                            <option value="">Select a status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>

                                        {
                                            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <button disabled={disable} type='submit' className='btn btn-primary mt-3'>Create</button>
                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Create
