import { useState } from 'react'
import useCreateCategory from '@/hooks/useCreateCategory'

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState('')
  const createCategory = useCreateCategory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!categoryName) return

    await createCategory(categoryName)
    setCategoryName('')
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-stone-500 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </form>
    </div>
  )
}
