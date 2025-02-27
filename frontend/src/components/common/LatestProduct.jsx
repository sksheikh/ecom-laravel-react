import React from 'react';
import ProductImgEight from '../../assets/images/mens/eight.jpg';


const LatestProduct = () => {
    return (
        <>
            <div className="new-arrival-product-section py-5">
                <div className="container">
                    <h2>New Arrival</h2>
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImgEight} alt="product image" className='w-100' />
                                </div>
                                <div className="card-body mt-2">
                                    <a href="">Red Check Shirt for Mens</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImgEight} alt="product image" className='w-100' />
                                </div>
                                <div className="card-body mt-2">
                                    <a href="">Red Check Shirt for Mens</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImgEight} alt="product image" className='w-100' />
                                </div>
                                <div className="card-body mt-2">
                                    <a href="">Red Check Shirt for Mens</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="product card border-0">
                                <div className="card-img">
                                    <img src={ProductImgEight} alt="product image" className='w-100' />
                                </div>
                                <div className="card-body mt-2">
                                    <a href="">Red Check Shirt for Mens</a>
                                    <div className="price">
                                        $50 <span className='text-decoration-line-through'>$80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestProduct
