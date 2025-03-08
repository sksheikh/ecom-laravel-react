import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../common/Layout'

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <div className="card shadow border-0 login">
          <div className="card-body p-4">
            <h3>Admin Login</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="" className='form-label'>Email</label>
                <input
                  {
                  ...register('email', {
                    required: 'The email field is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address"
                    }
                  })
                  }
                  type="text"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  placeholder='Email' />
                {
                  errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                }
              </div>

              <div className="mb-3">
                <label htmlFor="" className='form-label'>Password</label>
                <input
                  {
                  ...register('password', {
                    required: 'The password field is required'
                  })
                  }
                  type="password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  placeholder='Password' />
                {
                  errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                }
              </div>

              <button className='btn btn-secondary'>Login</button>
            </form>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Login
