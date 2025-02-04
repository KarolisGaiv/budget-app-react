import { useUserStore, UserState, Income } from '@/stores/user'
import useCategories from '@/hooks/useCategories'
import CategoryForm from '@/components/CategoryForm'
import useDeleteCategory from '@/hooks/useDeleteCategory'
import ExpenseForm from '@/components/ExpenseForm'
import useLoadIncome from '@/hooks/useLoadIncome'
import { useState } from 'react'
import IncomeForm from '@/components/IncomeForm'

export default function Dashboard() {
  const user = useUserStore((state: UserState) => state.user)
  useCategories()
  const userCategories = useUserStore((state: UserState) => state.categories)
  const removeCategory = useDeleteCategory()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const expenses = useUserStore((state: UserState) => state.expenses)
  useLoadIncome()

  const userIncome = useUserStore((state: UserState) => state.income)

  function handleCategoryDelete(id: number) {
    removeCategory(id)
  }

  function toggleExpenseForm(categoryName: string) {
    setActiveCategory(prev => (prev === categoryName ? null : categoryName))
  }

  function calculateMonthlyIncome(data: Income[]): number {
    const sum = data.reduce((acc, currentValue) => acc + currentValue.amount, 0)
    return sum
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
        <div className="my-9">
          <div>
            <h3>Total income: {calculateMonthlyIncome(userIncome)}</h3>
            <IncomeForm />
          </div>
        </div>
        <ul className="space-y-4">
          {userCategories.map(category => {
            const categoryExpenses = expenses.filter(expense => expense.category === category.name)

            return (
              <li
                key={category.id}
                className="flex justify-between items-center p-4 bg-gray-700 rounded-md shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg">{category.name}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCategoryDelete(category.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 dark:hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 dark:hover:bg-blue-600 transition"
                      onClick={() => toggleExpenseForm(category.name)}
                    >
                      {activeCategory === category.name ? 'Cancel' : 'Add Expense'}
                    </button>
                  </div>
                </div>

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
