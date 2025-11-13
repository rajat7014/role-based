'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await api.post('/auth/login', form)
    localStorage.setItem('token', res.data.token)

    router.push('/dashboard')
  }

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='p-6 max-w-md mx-auto bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl w-full text-center border border-white/30'>
        <h1 className='text-2xl font-bold'>Login</h1>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <input
            name='email'
            placeholder='Email'
            className='w-full p-2 border'
            onChange={handleChange}
          />

          <input
            name='password'
            type='password'
            placeholder='Password'
            className='w-full p-2 border'
            onChange={handleChange}
          />

          <button className='bg-blue-600 text-white w-full p-2 cursor-pointer'>
            Login
          </button>
          <div className='text-center'>
            <p className='text-sm'>
              New user?{' '}
              <a href='/signup' className='text-blue-600 hover:underline'>
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
