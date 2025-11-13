'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import api from '@/utils/api'
import { useRouter } from 'next/navigation'

type UserType = {
  name: string
  email: string
  role: 'User' | 'Admin'
}

type ItemType = {
  _id: string
  title: string
  description?: string
}

export default function DashboardPage() {
  const router = useRouter()

  const [user, setUser] = useState<UserType | null>(null)

  // CRUD States
  const [items, setItems] = useState<ItemType[]>([])
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch logged-in user
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) return router.push('/login')

    api
      .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data)
        // fetchItems(search) // Load items when user loads
      })
      .catch(() => router.push('/login'))
  }, [])

  // Fetch items
  const fetchItems = async (searchValue: string) => {
    const token = localStorage.getItem('token')
    if (!token) return

    const res = await api.get(`/items?search=${search}&page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setItems(res.data.items)
    setTotalPages(res.data.totalPages)
  }

  // Create item
  const createItem = async () => {
    if (!title.trim()) return

    const token = localStorage.getItem('token')
    if (!token) return

    await api.post(
      '/items',
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    setTitle('')
    fetchItems(search)
  }

  // Delete item
  const deleteItem = async (id: string) => {
    const token = localStorage.getItem('token')
    if (!token) return

    await api.delete(`/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    fetchItems(search)
  }

  if (!user)
    return <p className='text-center mt-10 text-gray-600'>Loading...</p>

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6'>
      <div className='bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center border border-white/30'>
        {/* HEADER */}
        <h1 className='text-4xl font-extrabold text-white drop-shadow-lg tracking-wide'>
          Welcome, <span className='text-yellow-300'>{user.name}</span>
        </h1>

        <p
          className={`mt-4 text-lg font-semibold ${
            user.role === 'Admin' ? 'text-red-200' : 'text-green-200'
          }`}
        >
          ({user.role})
        </p>

        <p className='mt-6 text-white/90 text-sm leading-relaxed'>
          You are successfully logged in. Enjoy your personalized dashboard
          experience.
        </p>
        {/* ADMIN-ONLY SECTION */}
        {user.role === 'Admin' && (
          <div className='mt-8 bg-red-500/20 border border-red-300/40 backdrop-blur-lg p-6 rounded-xl text-white shadow-xl'>
            <h2 className='text-2xl font-bold mb-3'>🔧 Admin Panel</h2>

            <p className='text-white/80 mb-4'>
              As an admin, you have elevated privileges. You can review
              statistics and manage system data.
            </p>

            <div className='flex flex-wrap gap-4 justify-center'>
              <button className='px-4 py-2 bg-red-600 rounded shadow hover:bg-red-700'>
                View All Users
              </button>

              <button className='px-4 py-2 bg-red-600 rounded shadow hover:bg-red-700'>
                System Analytics
              </button>

              <button className='px-4 py-2 bg-red-600 rounded shadow hover:bg-red-700'>
                All Items Listing
              </button>
            </div>
          </div>
        )}

        {/* CRUD SECTION */}
        <div className='mt-10 bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/30 shadow-xl text-left'>
          <h2 className='text-xl font-bold text-white mb-4'>Your Items</h2>
          <select
            className='p-2 mb-4 rounded bg-white/30 text-white outline-none'
            onChange={(e) => {
              const value = e.target.value
              if (value === 'asc')
                setItems(
                  [...items].sort((a, b) => a.title.localeCompare(b.title))
                )
              if (value === 'desc')
                setItems(
                  [...items].sort((a, b) => b.title.localeCompare(a.title))
                )
              if (value === 'latest') fetchItems(search)
            }}
          >
            <option className='text-black' value='latest'>
              Latest
            </option>
            <option className='text-black' value='asc'>
              A → Z
            </option>
            <option className='text-black' value='desc'>
              Z → A
            </option>
          </select>

          {/* SEARCH BAR */}
          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value)
              fetchItems(e.target.value)
            }}
            className='w-full p-2 rounded mb-4 bg-white/30 text-white placeholder-white/60 outline-none'
          />

          {/* ADD ITEM */}
          <div className='flex gap-2 mb-4'>
            <input
              placeholder='Title'
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className='p-2 rounded w-full bg-white/30 text-white placeholder-white/60 outline-none'
            />
            <button
              onClick={createItem}
              className='bg-blue-600 text-white px-4 rounded hover:bg-blue-700'
            >
              Add
            </button>
          </div>

          {/* ITEM LIST */}
          <ul>
            {items.length === 0 && (
              <p className='text-white/70'>No items found.</p>
            )}

            {items.map((item) => (
              <li
                key={item._id}
                className='flex justify-between bg-white/10 p-3 rounded mb-2 text-white'
              >
                <span>{item.title}</span>
                {/* PAGINATION */}
                <div className='flex justify-center gap-4 mt-4 text-white'>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className='px-3 py-1 bg-white/20 rounded disabled:opacity-40'
                  >
                    Prev
                  </button>

                  <span className='font-bold'>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className='px-3 py-1 bg-white/20 rounded disabled:opacity-40'
                  >
                    Next
                  </button>
                </div>

                <div className='flex gap-3'>
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => {
                      setTitle(item.title)
                      setEditingId(item._id)
                    }}
                    className='text-blue-300 hover:text-blue-500'
                  >
                    Edit
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteItem(item._id)}
                    className='text-red-300 hover:text-red-500'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem('token')
              router.push('/login')
            }}
            className='mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-medium shadow-md cursor-pointer'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
