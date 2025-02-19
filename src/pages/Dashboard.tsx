import { useUserStore, UserState } from '@/stores/user'
import useCategories from '@/hooks/useCategories'
import useLoadIncome from '@/hooks/useLoadIncome'
import useExpenses from '@/hooks/useExpenses'
import { useState } from 'react'
import ExpenseView from '@/pages/ExpenseView'
import IncomeView from '@/pages/IncomeView'

export default function Dashboard() {
  useCategories()
  useLoadIncome()
  useExpenses()
  const user = useUserStore((state: UserState) => state.user)
  const [activeView, setActiveView] = useState<'expenses' | 'income'>('expenses')

  console.log('test')

  if (!user) {
    return (
      <p className="text-center text-xl text-gray-400">Please log in to access the dashboard.</p>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6  dark:text-white">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-md text-sm transition ${
              activeView === 'expenses' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveView('expenses')}
          >
            Expenses
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm transition ${
              activeView === 'income' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveView('income')}
          >
            Income
          </button>
        </div>
      </header>
      {activeView === 'expenses' ? <ExpenseView /> : <IncomeView />}
    </div>
  )
}
