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
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
