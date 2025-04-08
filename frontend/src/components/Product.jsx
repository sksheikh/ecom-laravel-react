import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductImgOne from '../assets/images/mens/five.jpg';
import Layout from './common/Layout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { baseUrl } from './common/http';


const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4);
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const params = useParams();

    const fetchProduct = () => {
        fetch(`${baseUrl}/get-product/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/jso",
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status == 200) {
                    setProduct(result.data)
                    setProductImages(result.data.product_images)
                    setProductSizes(result.data.product_sizes)
                } else {
                    console.log(result.message || 'something went wrong')
                }
            })
    }

    useEffect(() => {
        fetchProduct();
    }, [params.id])

    return (
        <Layout>
            <div className="container product-detail">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-5">
                        <div className="row">
                            <div className="col-md-2">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={(swiper) => setThumbsSwiper(swiper)}
                                    loop={false}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    watchSlidesVisibility={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >
                                    {
                                        productImages && productImages.map(image => {
                                            return (
                                                <SwiperSlide key={image.id}>
                                                    <div className='content'>
                                                        <img
                                                            src={image.image_url}
                                                            alt={product.title}
                                                            height={100}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }


                                </Swiper>
                            </div>

                            <div className="col-md-10">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {
                                        productImages && productImages.map(image => {
                                            return (
                                                <SwiperSlide key={image.id}>
                                                    <div className='content'>
                                                        <img
                                                            src={image.image_url}
                                                            alt={product.title}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h3>{product.title}</h3>
                        <div className='d-flex'>
                            <Rating
                                readonly
                                size={20}
                                initialValue={rating} />
                            <span className='pt-1 ps-2'>10 Reviews</span>
                        </div>

                        <div className="price py-2 h3">
                            ${product.price} <span className='text-decoration-line-through'>${product.compare_price}</span>
                        </div>

                        <div>
                            {product.short_description}
                        </div>

                        <div className="pt-2">
                            <strong>Select Sizes:</strong>
                            <div className="sizes pt-2">
                                {
                                    productSizes && productSizes.map(productSize=> {
                                        return (
                                            <button key={productSize.id} className='btn btn-size ms-1'>{productSize.size.name}</button>
                                        )
                                    })
                                }
                                
                            </div>
                        </div>

                        <div className="add-to-cart my-3">
                            <button className='btn btn-primary'>Add to cart</button>
                        </div>

                        <hr />
                        <div>
                            <strong>SKU: </strong>
                            {product.sku}
                        </div>

                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-12">
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{ __html:product.description }}></div>
                            </Tab>
                            <Tab eventKey="review" title="Reviews(10)">
                                Tab content for Reviews(10)
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
