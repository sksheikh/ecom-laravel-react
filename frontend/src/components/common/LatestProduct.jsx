import React, { useEffect, useState } from 'react';
import { baseUrl } from './http';

const LatestProduct = () => {
    const [products, setProducts] = useState([]);
    const latestProducts = async () => {
        await fetch(`${baseUrl}/get-latest-products`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                setProducts(result.data);
                // console.log(result)
            })
    }

    useEffect(() => {
        latestProducts();
    }, []);

    return (
        <>
            <div className="new-arrival-product-section pt-5">
                <div className="container">
                    <h2>New Arrival</h2>
                    <div className="row mt-4">
                        {products && products.map(product => {
                            return (
                                <div className="col-md-3 col-6" key={product.id}>
                                    <div className="product card border-0">
                                        <div className="card-img">
                                            {product.image_url ?
                                                <img src={product.image_url} alt="product image" className='w-100' /> :
                                                <img src="https://placehold.co/400x460" alt="product image" className='w-100' />
                                            }
                                        </div>
                                        <div className="card-body mt-2">
                                            <a href="">{product.title}</a>
                                            <div className="price">
                                                ${product.price} &nbsp;
                                                {product.compare_price && <span className='text-decoration-line-through'>${product.compare_price}</span>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestProduct
