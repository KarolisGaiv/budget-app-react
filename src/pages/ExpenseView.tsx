import { useRef, useState } from 'react'
import { useUserStore, UserState } from '@/stores/user'
import ExpenseForm from '@/components/ExpenseForm'
import useDeleteCategory from '@/hooks/useDeleteCategory'
import CategoryForm from '@/components/CategoryForm'
import { calculateTotalExpense } from '@/utils/expenseCalculation'
import UpdateRecordForm from '@/components/UpdateRecordForm'

export default function ExpenseView() {
  const userCategories = useUserStore((state: UserState) => state.categories)
  const expenses = useUserStore((state: UserState) => state.expenses)
  const removeCategory = useDeleteCategory()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false)
  const modalOverlayRef = useRef<HTMLDivElement>(null) // Ref for the new expense form modal overlay
  const [isUpdateRecordFormOpen, setIsUpdateRecordFormOpen] = useState(false)
  const [recordToUpdate, setRecordToUpdate] = useState<number | null>(null)

  function handleCategoryDelete(id: number) {
    removeCategory(id)
  }

  function toggleExpenseForm(categoryName: string) {
    setActiveCategory(prev => (prev === categoryName ? null : categoryName))
  }

  function handleAddCategoryClick() {
    setIsCategoryFormVisible(true)
  }

  function handleCloseCategoryForm() {
    setIsCategoryFormVisible(false)
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === modalOverlayRef.current) {
      handleCloseCategoryForm()
    }
  }

  function toggleUpdateRecordForm(recordID: number) {
    setIsUpdateRecordFormOpen(prev => {
      const isOpening = !prev
      setRecordToUpdate(isOpening ? recordID : null)
      return isOpening
    })
  }

  return (
    <div className="p-6  text-white rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Your Expenses</h2>
        <p>Total Spent: {calculateTotalExpense(expenses)} EUR</p>
        <button onClick={handleAddCategoryClick}>Add Category</button>
      </div>

      <ul className="space-y-4 mt-4">
        {userCategories.map(category => {
          const categoryExpenses = expenses.filter(expense => expense.category === category.name)

          return (
            <li
              key={category.id}
              className="p-4 bg-gray-700 rounded-md shadow-sm hover:bg-gray-600 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{category.name}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCategoryDelete(category.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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
                      onClick={() => toggleUpdateRecordForm(expense.id)}
                      key={expense.id}
                      className="p-2 rounded-md shadow-sm flex justify-between hover:bg-sky-700 cursor-pointer
"
                    >
                      <span className="font-medium">
                        {expense.amount} {expense.currency} {expense.id}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm mt-2">No expenses yet.</p>
              )}

              {activeCategory === category.name && (
                <ExpenseForm categoryName={category.name} onClose={() => setActiveCategory(null)} />
              )}
            </li>
          )
        })}
      </ul>

      {isCategoryFormVisible && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <CategoryForm onClose={handleCloseCategoryForm} />
        </div>
      )}

      {isUpdateRecordFormOpen && recordToUpdate !== null && (
        <div>
          <UpdateRecordForm recordID={recordToUpdate} />
        </div>
      )}
    </div>
  )
}
