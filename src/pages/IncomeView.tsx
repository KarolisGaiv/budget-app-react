import { useEffect, useState } from 'react'
import { useUserStore, UserState } from '@/stores/user'
import {
  calculateTotalIncome,
  calculateIncomeByCategory,
  uniqueCategoryData,
} from '@/utils/incomeCalculation'

export default function IncomeView() {
  const incomeData = useUserStore((state: UserState) => state.income)
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [incomeByCategory, setTotalIncomeByCategory] = useState<uniqueCategoryData[]>([])

  useEffect(() => {
    setTotalIncome(calculateTotalIncome(incomeData))
    const incomeDetails = calculateIncomeByCategory(incomeData)
    setTotalIncomeByCategory(incomeDetails)
  }, [incomeData])

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Total Income</h2>
      <h3 className="font-semibold mb-4">{totalIncome} EUR</h3>

      <ul>
        {incomeByCategory.map(category => {
          return (
            <li key={category.category}>
              <div>{category.category}</div>
              <div>{category.totalAmount} EUR</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
