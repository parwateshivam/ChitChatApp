import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../reduxStore/userSlice/user.thunk'

const Register = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat')
    }
  }, [isAuthenticated, navigate])

  const [registerData, setRegisterData] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const response = await dispatch(registerUserThunk(registerData))
    if (response?.payload?.success) {
      navigate('/chat')
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      <fieldset className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-[360px] text-white shadow-lg">

        <legend className="text-2xl font-bold text-primary mb-2">
          Create Account
        </legend>

        {/* Full Name */}
        <input
          type="text"
          name="fullName"
          value={registerData.fullName}
          onChange={handleChange}
          className="input input-bordered w-full mb-3 bg-gray-900 border-gray-700 px-3"
          placeholder="Full Name"
        />

        {/* Username */}
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleChange}
          className="input input-bordered w-full mb-3 bg-gray-900 border-gray-700 px-3"
          placeholder="Username"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          className="input input-bordered w-full mb-3 bg-gray-900 border-gray-700 px-3"
          placeholder="Password"
        />

        {/* Gender */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={registerData.gender === 'male'}
              onChange={handleChange}
              className="radio radio-primary border"
            />
            <span>Male</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={registerData.gender === 'female'}
              onChange={handleChange}
              className="radio radio-primary border"
            />
            <span>Female</span>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full mb-3 bg-primary"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-primary hover:underline">
            Login
          </Link>
        </p>

      </fieldset>
    </div>
  )
}

export default Register
