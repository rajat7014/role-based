'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'

type SignupForm = {
  name: string
  email: string
  password: string
  role: 'User' | 'Admin'
}

export default function SignupPage() {
  const router = useRouter()

  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    role: 'User',
  })

  //   const validate = signupSchema.safeParse(form)

  //   if (!validate.success) {
  //     alert('Invalid form: ' + validate.error.errors[0].message)
  //     return
  //   }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await api.post('/auth/signup', form)
    localStorage.setItem('token', res.data.token)

    router.push('/dashboard')
  }

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='p-6 max-w-md mx-auto bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl w-full text-center border border-white/30'>
        <h1 className='text-2xl font-bold'>Signup</h1>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <input
            name='name'
            placeholder='Name'
            className='w-full p-2 border'
            onChange={handleChange}
          />

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

          <select
            name='role'
            className='w-full p-2 border'
            onChange={handleChange}
          >
            <option>User</option>
            <option>Admin</option>
          </select>

          <button className='bg-blue-600 text-white w-full p-2 cursor-pointer'>
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}
