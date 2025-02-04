import { useState } from 'react'
import { useUserStore, UserState } from '@/stores/user'
import useDeleteCategory from '@/hooks/useDeleteCategory'

export default function IncomeView() {
  const incomeData = useUserStore((state: UserState) => state.income)
  const removeCategory = useDeleteCategory()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Group income by category and calculate total per category
  const incomeByCategory: Record<string, number> = {}

  for (const income of incomeData) {
    if (!incomeByCategory[income.category]) {
      incomeByCategory[income.category] = 0
    }
    incomeByCategory[income.category] += income.amount
  }

  function handleCategoryDelete(categoryName: string) {
    // Find an income item with the given category and delete it by ID
    const categoryToDelete = incomeData.find(item => item.category === categoryName)
    if (categoryToDelete) {
      removeCategory(categoryToDelete.id)
    }
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Income</h2>

      <ul className="space-y-4 mt-4">
        {Object.entries(incomeByCategory).map(([category, total]) => (
          <li
            key={category}
            className="p-4 bg-gray-700 rounded-md shadow-sm hover:bg-gray-600 transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">
                {category}: {total} EUR
              </span>
              <button
                onClick={() => handleCategoryDelete(category)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
