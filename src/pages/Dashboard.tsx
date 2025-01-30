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
    return <p>Please log in to access the dashboard.</p>
  }

  return (
    <div className="container">
      <header className="mainHeader">
        <h1>Dashboard</h1>
      </header>

      <div className="card">
        <p>Welcome, {user.email}</p>
        <h2>Your Categories</h2>
        <ul>
          {userCategories.map(category => (
            <li key={category.id} className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <span>{category.name}</span>
                <button
                  onClick={() => handleCategoryDelete(category.id)}
                  className="button primary"
                >
                  Delete Category
                </button>
                <button
                  onClick={() => toggleExpenseForm(category.name)}
                  className="button secondary"
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

      <div className="card">
        <CategoryForm />
      </div>
    </div>
  )
}
