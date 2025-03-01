import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductImgOne from '../assets/images/mens/five.jpg';
import ProductImgThree from '../assets/images/mens/seven.jpg';
import ProductImgTwo from '../assets/images/mens/six.jpg';
import Layout from './common/Layout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4);

    return (
        <Layout>
            <div className="container product-detail">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Dummy Product Title</li>
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

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgOne}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgTwo}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgThree}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
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

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgOne}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgTwo}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgThree}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h3>Dummy Product Title</h3>
                        <div className='d-flex'>
                            <Rating
                                readonly
                                size={20}
                                initialValue={rating} />
                            <span className='pt-1 ps-2'>10 Reviews</span>
                        </div>

                        <div className="price py-2 h3">
                            $50 <span className='text-decoration-line-through'>$80</span>
                        </div>

                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis non, maxime officia sit ut laboriosam et repellendus officiis necessitatibus omnis.
                        </div>

                        <div className="pt-2">
                            <strong>Select Sizes:</strong>
                            <div className="sizes pt-2">
                                <button className='btn btn-size ms-1'>S</button>
                                <button className='btn btn-size ms-1'>M</button>
                                <button className='btn btn-size ms-1'>L</button>
                                <button className='btn btn-size ms-1'>XL</button>
                            </div>
                        </div>

                        <div className="add-to-cart my-3">
                            <button className='btn btn-primary'>Add to cart</button>
                        </div>

                        <hr />
                        <div>
                            <strong>SKU: </strong>
                            DD00XX
                        </div>

                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-12">
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Description">
                                Tab content for Description
                            </Tab>
                            <Tab eventKey="profile" title="Reviews(10)">
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
