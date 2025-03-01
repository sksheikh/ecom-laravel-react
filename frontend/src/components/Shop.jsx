import React from 'react';
import { Link } from 'react-router-dom';
import ProductImgEight from '../assets/images/mens/eight.jpg';
import Layout from './common/Layout';


const Shop = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className='py-4'>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Library</li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-2'>Categories</h3>
                  <ul>
                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>Mens</span>
                    </li>

                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>Women</span>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>Kids</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-2'>Brands</h3>
                  <ul>
                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>Gentle Park</span>
                    </li>

                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>Plus Point</span>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>One Point</span>
                    </li>
                    <li className='mb-2'>
                      <input type="checkbox" />
                      <span className='ps-2'>Mens World</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        <img src={ProductImgEight} alt="product image" className='w-100' />
                      </Link>
                    </div>
                    <div className="card-body mt-2">
                      <Link to="/product">Red Check Shirt for Mens</Link>
                      <div className="price">
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        <img src={ProductImgEight} alt="product image" className='w-100' />
                      </Link>
                    </div>
                    <div className="card-body mt-2">
                      <Link to="/product">Red Check Shirt for Mens</Link>
                      <div className="price">
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        <img src={ProductImgEight} alt="product image" className='w-100' />
                      </Link>
                    </div>
                    <div className="card-body mt-2">
                      <Link to="/product">Red Check Shirt for Mens</Link>
                      <div className="price">
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        <img src={ProductImgEight} alt="product image" className='w-100' />
                      </Link>
                    </div>
                    <div className="card-body mt-2">
                      <Link to="/product">Red Check Shirt for Mens</Link>
                      <div className="price">
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        <img src={ProductImgEight} alt="product image" className='w-100' />
                      </Link>
                    </div>
                    <div className="card-body mt-2">
                      <Link to="/product">Red Check Shirt for Mens</Link>
                      <div className="price">
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        <img src={ProductImgEight} alt="product image" className='w-100' />
                      </Link>
                    </div>
                    <div className="card-body mt-2">
                      <Link to="/product">Red Check Shirt for Mens</Link>
                      <div className="price">
                        $50 <span className='text-decoration-line-through'>$80</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}

export default Shop
