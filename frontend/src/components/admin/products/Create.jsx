import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { adminToken, baseUrl } from '../../common/http'
import JoditEditor from 'jodit-react'

const Create = ({ placeholder }) => {
    const [disable, setDisable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const navigate = useNavigate();

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    //submit product create form
    const createProduct = async (data) => {
        // console.log(data)
        setDisable(true)
        const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setDisable(false)
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/products')
                } else {
                    toast.error(result.message || 'Something went wrong!')
                }
            })
    }

    //fetch all categories
    const fetchCategories = async () => {
        const res = await fetch(`${baseUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setCategories(result.data)

            })
    }

    //fetch all categories
    const fetchBrands = async () => {
        const res = await fetch(`${baseUrl}/brands`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setBrands(result.data)

            })
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Products / Create</h4>
                        <Link to="/admin/products" className="btn btn-dark">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(createProduct)}>
                            <div className="card shadow">
                                <div className="card-body p-4">

                                    <div className="mb-3">
                                        <label
                                            htmlFor="title"
                                            className='form-label'> Title </label>
                                        <input
                                            {...register('title', {
                                                required: 'The title field is required',
                                            })}
                                            id='title'
                                            type="text"
                                            placeholder='Title'
                                            className={`form-control ${errors.title && 'is-invalid'}`} />

                                        {
                                            errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                        }
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="category" className='form-label'>Category</label>
                                                <select id="category" className='form-control'>
                                                    <option value="">Select a Category</option>
                                                    {
                                                        categories && categories.map(category => {
                                                            return (
                                                                <option
                                                                    key={category.id}
                                                                    value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="brand" className='form-label'>Brand</label>
                                                <select id="brand" className='form-control'>
                                                    <option value="">Select a Brand</option>
                                                    {brands && brands.map(brand => {
                                                        return (
                                                            <option
                                                                key={brand.id}
                                                                value={brand.id}>
                                                                {brand.name}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="short_description" className='form-label'>Short Description</label>
                                        <textarea id="short_description" rows={3} placeholder='Short description' className='form-control'></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <JoditEditor
                                            id='description'
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            // onChange={newContent => { }}
                                        />
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
