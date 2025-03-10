import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../common/Layout'
import { baseUrl } from '../common/http'
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from '../context/AdminAuth'

const Login = () => {
  const navigate = useNavigate();
  const {login} = useContext(AdminAuthContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    const res = await fetch(`${baseUrl}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(result => {
        console.log(result)

        if (result.status == 200) {
          const adminInfo = {
            token: result.token,
            id: result.id,
            name: result.name
          }

          localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
          login(adminInfo)
          navigate('/admin/dashboard')
        } else {
          toast.error(result.message)
        }
      })
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
