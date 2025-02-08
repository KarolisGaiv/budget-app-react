import { useEffect, useState } from 'react'
import { useUserStore, UserState } from '@/stores/user'
import {
  calculateTotalIncome,
  calculateIncomeByCategory,
  uniqueCategoryData,
} from '@/utils/incomeCalculation'
import IncomeForm from '@/components/IncomeForm'

export default function IncomeView() {
  const incomeData = useUserStore((state: UserState) => state.income)
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [incomeByCategory, setTotalIncomeByCategory] = useState<uniqueCategoryData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    setTotalIncome(calculateTotalIncome(incomeData))
    const incomeDetails = calculateIncomeByCategory(incomeData)
    setTotalIncomeByCategory(incomeDetails)
  }, [incomeData])

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Your Total Income</h2>
        <h3 className="font-semibold mb-4">{totalIncome} EUR</h3>
        <button>Add Category</button>
      </div>

      <ul>
        {incomeByCategory.map(category => {
          return (
            <li
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className="cursor-pointer p-4 bg-gray-700 rounded-md shadow-sm hover:bg-gray-600 transition-all my-5"
            >
              <div>{category.category}</div>
              <div>{category.totalAmount} EUR</div>
            </li>
          )
        })}
      </ul>

      {/* Modal for IncomeForm */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Income to {selectedCategory}</h3>
            <IncomeForm
              preselectedCategory={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
