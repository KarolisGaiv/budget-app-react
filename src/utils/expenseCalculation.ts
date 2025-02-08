import { Expense } from '@/stores/user'

export type uniqueCategoryData = {
  category: string
  totalAmount: number
}

function calculateTotalExpense(data: Expense[]): number {
  return data.reduce((acc, expense) => acc + expense.amount, 0)
}

/**
 * Calculates the total income amount for each category from a list of users income
 *
 * @param {Income[]} userIncomeData  An array of user income records, which can be retreived from user store
 * @returns {Array<CategoryTotals>} An array of objects, where each object contains a "category" and "totalAmount"
 */

// function calculateIncomeByCategory(userIncomeData: Income[]): uniqueCategoryData[] {
//   const uniqueCategories = [...new Set(userIncomeData.map(record => record.category))]

//   const categoryTotals: uniqueCategoryData[] = []

//   uniqueCategories.forEach(category => {
//     // filter data for current category
//     const filteredData = userIncomeData.filter(record => record.category === category)
//     // calculate total amount for filtered data
//     const totalAmount = filteredData.reduce((sum, record) => sum + record.amount, 0)

//     const categoryTotalObject = { category: category, totalAmount: totalAmount }

//     categoryTotals.push(categoryTotalObject)
//   })

//   return categoryTotals
// }

export { calculateTotalExpense }
