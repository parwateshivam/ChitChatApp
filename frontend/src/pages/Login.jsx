import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../reduxStore/userSlice/user.thunk'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat')
    }
  }, [isAuthenticated, navigate])

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const response = await dispatch(loginUserThunk(loginData))
    if (response?.payload?.success) {
      navigate('/chat')
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      <fieldset className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-[360px] text-white shadow-lg">

        <legend className="text-2xl font-bold text-primary mb-2">
          Welcome Back
        </legend>

        {/* Username */}
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          className="input input-bordered w-full mb-3 bg-gray-900 border-gray-700 px-3"
          placeholder="Username"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="input input-bordered w-full mb-4 bg-gray-900 border-gray-700 px-3"
          placeholder="Password"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full mb-3 bg-primary"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create new
          </Link>
        </p>

      </fieldset>
    </div>
  )
}

export default Login
