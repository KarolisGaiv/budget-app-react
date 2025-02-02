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
          {/* {userCategories.map(category => (
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
          ))} */}
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

      <div className="card">
        <CategoryForm />
      </div>
    </div>
  )
}
