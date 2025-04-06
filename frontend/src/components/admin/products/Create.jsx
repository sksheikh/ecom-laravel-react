import JoditEditor from 'jodit-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { adminToken, baseUrl } from '../../common/http'

const Create = ({ placeholder }) => {
    const [disable, setDisable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
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
        setError,
        formState: { errors },
    } = useForm()

    //submit product create form
    const createProduct = async (data) => {
        const formData = { ...data, "description": content, "gallery": gallery }
        console.log(formData)
        // return;
        setDisable(true)
        const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setDisable(false)
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/products')
                } else {
                    const formErrors = result.errors;
                    Object.keys(formErrors).forEach(field => {
                        setError(field, { message: formErrors[field][0] });
                    })
                }
            })
    }

    //handle file
    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file)
        console.log(formData)
        // return

        setDisable(true)
        const res = await fetch(`${baseUrl}/temp-images`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: formData
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                gallery.push(result.data.id)
                setGallery(gallery)

                galleryImages.push(result.data.image_url)
                setGalleryImages(galleryImages)

                setDisable(false)
                e.target.value = ""

            })
    }

    //handle delete image 
    const handleDelete = (image) => {
        const newGallaryImages = galleryImages.filter(gallary => gallary != image);
        setGalleryImages(newGallaryImages);
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
                                                <select
                                                    {...register('category', {
                                                        required: 'Please Select a Categoy'
                                                    })}
                                                    id="category"
                                                    className={`form-control ${errors.category && 'is-invalid'}`}>
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

                                                {
                                                    errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="brand" className='form-label'>Brand</label>
                                                <select
                                                    {...register('brand')}
                                                    id="brand"
                                                    className='form-control'>
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
                                        <textarea {...register('short_description')} id="short_description" rows={3} placeholder='Short description' className='form-control'></textarea>
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

                                    <h3 className='border-bottom py-3 mb-3'>Pricing</h3>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="price" className="form-label">Price</label>
                                                <input
                                                    {...register('price', {
                                                        required: "The price field is required"
                                                    })}
                                                    type="text"
                                                    placeholder='price'
                                                    className={`form-control ${errors.price && 'is-invalid'}`} />
                                                {errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="discounted_price" className="form-label">Discounted Price</label>
                                                <input {...register('compare_price')} type="text" placeholder='discounted price' className='form-control' />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className='border-bottom py-3 mb-3'>Inventory</h3>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="sku" className="form-label">Sku</label>
                                                <input
                                                    {...register('sku', {
                                                        required: 'The Sku field is required'
                                                    })}
                                                    type="text"
                                                    placeholder='sku'
                                                    className={`form-control ${errors.sku && 'is-invalid'}`} />
                                                {errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="barcode" className="form-label">Barcode</label>
                                                <input {...register('barcode')} type="text" placeholder='barcode' className='form-control' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="qty" className="form-label">Qty</label>
                                                <input {...register('qty')} type="text" placeholder='qty' className='form-control' />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
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

                                    <div className="mb-3">
                                        <label htmlFor="is_featured" className='form-label'>Featured</label>
                                        <select
                                            {...register('is_featured', {
                                                required: "This field is required"
                                            })}
                                            id="is_featured"
                                            className={`form-control ${errors.is_featured && 'is-invalid'}`}>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>

                                        {errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>}
                                    </div>

                                    <h3 className='border-bottom py-3 mb-3'>Gallery</h3>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Image</label>
                                        <input
                                            // {...register('image')} 
                                            type="file"
                                            id="image"
                                            onChange={handleFile}
                                            className='form-control' />
                                    </div>

                                    <div className="mb-3">
                                        <div className="row">
                                            {
                                                galleryImages && galleryImages.map((image, index) => {
                                                    return (
                                                        <div className="col-md-3" key={index}>
                                                            <div className="card shadow">
                                                                <img src={image} alt="" className='w-100' />
                                                                <button onClick={() => handleDelete(image)} className='btn btn-danger'>delete</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <button
                                disabled={disable}
                                type='submit'
                                className='btn btn-primary mt-3 mb-5'>
                                Create
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Create
