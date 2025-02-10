import { Expense } from '@/stores/user'

export type uniqueCategoryData = {
  category: string
  totalAmount: number
}

function calculateTotalExpense(data: Expense[]): number {
  return data.reduce((acc, expense) => acc + expense.amount, 0)
}

/**
 * Calculates the total expense amount for each category from a list of users expenses
 *
 * @param {Expense[]} userExpensesData  An array of user expenses records, which can be retreived from user store
 * @returns {Array<CategoryTotals>} An array of objects, where each object contains a "category" and "totalAmount"
 */

function calculateExpensesByCategory(userExpensesData: Expense[]): uniqueCategoryData[] {
  const uniqueCategories = [...new Set(userExpensesData.map(record => record.category))]

  const categoryTotals: uniqueCategoryData[] = []

  uniqueCategories.forEach(category => {
    // filter data for current category
    const filteredData = userExpensesData.filter(record => record.category === category)
    // calculate total amount for filtered data
    const totalAmount = filteredData.reduce((sum, record) => sum + record.amount, 0)

    const categoryTotalObject = { category: category, totalAmount: totalAmount }

    categoryTotals.push(categoryTotalObject)
  })

  return categoryTotals
}

export { calculateTotalExpense, calculateExpensesByCategory }
