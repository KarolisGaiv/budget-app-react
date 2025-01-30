import { useUserStore, UserState } from '@/stores/user'
import useCategories from '@/hooks/useCategories'
import CategoryForm from '@/components/CategoryForm'
import useDeleteCategory from '@/hooks/useDeleteCategory'
import ExpenseForm from '@/components/ExpenseForm'
import { useState } from 'react'

export default function Dashboard() {
  const user = useUserStore((state: UserState) => state.user)
  useCategories()
  const userCategories = useUserStore((state: UserState) => state.categories)
  const removeCategory = useDeleteCategory()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  function handleCategoryDelete(id: number) {
    removeCategory(id)
  }

  function toggleExpenseForm(categoryName: string) {
    setActiveCategory(prev => (prev === categoryName ? null : categoryName))
  }

  if (!user) {
    return (
      <p className="text-center text-xl text-gray-400">Please log in to access the dashboard.</p>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white dark:bg-gray-900 dark:text-white">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
      </header>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
        <p className="text-lg text-center">Welcome, {user.email}</p>
        <h2 className="text-2xl font-medium mt-4 mb-6">Your Categories</h2>
        <ul className="space-y-4">
          {userCategories.map(category => (
            <li
              key={category.id}
              className="flex justify-between items-center p-4 bg-gray-700 rounded-md shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
            >
              <span className="text-lg">{category.name}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCategoryDelete(category.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 dark:hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleExpenseForm(category.name)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 dark:hover:bg-blue-600 transition"
                >
                  {activeCategory === category.name ? 'Cancel' : 'Add Expense'}
                </button>
              </div>
              {activeCategory === category.name && (
                <ExpenseForm categoryName={category.name} onClose={() => setActiveCategory(null)} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <CategoryForm />
      </div>
    </div>
  )
}
