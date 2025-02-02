import { useUserStore, UserState } from '@/stores/user'
import useCategories from '@/hooks/useCategories'
import CategoryForm from '@/components/CategoryForm'
import useDeleteCategory from '@/hooks/useDeleteCategory'
import ExpenseForm from '@/components/ExpenseForm'
import { useState } from 'react'
import useExpenses from '@/hooks/useExpenses'

export default function Dashboard() {
  const user = useUserStore((state: UserState) => state.user)
  useCategories()
  const userCategories = useUserStore((state: UserState) => state.categories)
  const removeCategory = useDeleteCategory()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const expenses = useUserStore((state: UserState) => state.expenses) // Get expenses from store

  // useExpenses()

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

      <div className="card">
        <p>Welcome, {user.email}</p>
        <h2>Your Categories</h2>
        <ul>
          {userCategories.map(category => {
            const categoryExpenses = expenses.filter(expense => expense.category === category.name)

            return (
              <li key={category.id} className="p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{category.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleCategoryDelete(category.id)}>Delete</button>
                    <button onClick={() => toggleExpenseForm(category.name)}>
                      {activeCategory === category.name ? 'Cancel' : 'Add Expense'}
                    </button>
                  </div>
                </div>

                {/* Expense List */}
                {categoryExpenses.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {categoryExpenses.map(expense => (
                      <li
                        key={expense.id}
                        className="p-2 rounded-md shadow-sm flex justify-between"
                      >
                        <span className="font-medium">
                          {expense.amount} {expense.currency}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">No expenses yet.</p>
                )}

                {/* Expense Form */}
                {activeCategory === category.name && (
                  <ExpenseForm
                    categoryName={category.name}
                    onClose={() => setActiveCategory(null)}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <CategoryForm />
      </div>
    </div>
  )
}
