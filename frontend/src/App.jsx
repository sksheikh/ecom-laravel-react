import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Home from './components/Home'
import Product from './components/Product'
import Shop from './components/Shop'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import Dashboard from './components/admin/Dashboard'
import Login from './components/admin/Login'
import { default as CreateCategory } from './components/admin/category/Create'
import { default as EditCategory } from './components/admin/category/Edit'
import { default as ShowCategory } from './components/admin/category/Show'

import {default as CreateBrand} from './components/admin/brands/Create'
import {default as EditBrand} from './components/admin/brands/Edit'
import {default as ShowBrand} from './components/admin/brands/Show'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth >
              <Dashboard />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories' element={
            <AdminRequireAuth >
              <ShowCategory />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories/create' element={
            <AdminRequireAuth >
              <CreateCategory />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth >
              <EditCategory />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands' element={
            <AdminRequireAuth >
              <ShowBrand />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/create' element={
            <AdminRequireAuth >
              <CreateBrand />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth >
              <EditBrand />
            </AdminRequireAuth>
          } />

        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App
