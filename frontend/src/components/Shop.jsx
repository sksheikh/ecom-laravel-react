import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './common/Layout';
import { baseUrl } from './common/http';


const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedCat, setCheckedCat] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch(`${baseUrl}/get-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        if (result.status == 200) {
          setCategories(result.data)
        } else {
          console.log(result.message || 'something went wrong');
        }
      });
  }

  const fetchBrands = async () => {
    const res = await fetch(`${baseUrl}/get-brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        if (result.status == 200) {
          setBrands(result.data)
        } else {
          console.log(result.message || 'something went wrong');
        }
      });
  }

  const fetchProducts = async () => {
    const res = await fetch(`${baseUrl}/get-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.status == 200) {
          setProducts(result.data)
        } else {
          console.log(result.message || 'something went wrong');
        }
      });
  }

  const handleCategory = (e) => {
    const {checked, value} = e.target;
    if(checked){
      setCheckedCat(prev => [...prev, value]);
    }else{
      setCheckedCat(checkedCat.filter(cat => cat != value));
    }
  }

  console.log('checkedCat: '+ checkedCat);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [])

  return (
    <>
      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className='py-4'>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Library</li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-2'>Categories</h3>
                  <ul>
                    {
                      categories && categories.map((category) => {
                        return (
                          <li key={category.id} className='mb-2'>
                            <input 
                              type="checkbox" 
                              value={category.id}
                              onClick={handleCategory} />
                            <span className='ps-2'>{category.name}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3 className='mb-2'>Brands</h3>
                  <ul>
                    {
                      brands && brands.map((brand) => {
                        return (
                          <li key={brand.id} className='mb-2'>
                            <input type="checkbox" value={brand.id} />
                            <span className='ps-2'>{brand.name}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row">
                {products && products.map(product => {
                  return (
                    <div key={product.id} className="col-md-4">
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to="/product">
                            {product.image_url ?
                              <img src={product.image_url} alt="product image" className='w-100' /> :
                              <img src="https://placehold.co/400x460" alt="product image" className='w-100' />
                            }
                          </Link>
                        </div>
                        <div className="card-body mt-2">
                          <Link to="/product">{product.title}</Link>
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

        </div>
      </Layout>
    </>
  )
}

export default Shop
