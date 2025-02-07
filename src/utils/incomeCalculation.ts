import { Income } from '@/stores/user'

type uniqueCategoryData = {
  category: string
  totalAmount: number
}

function calculateTotalIncome(data: Income[]): number {
  const totalIncome = data.reduce((acc, currentValue) => acc + currentValue.amount, 0)

  return totalIncome
}

function calculateIncomeByCategory(userIncomeData: Income[]): uniqueCategoryData[] {
  const uniqueCategories = [...new Set(userIncomeData.map(record => record.category))]

  const categoryTotals: uniqueCategoryData[] = []

  uniqueCategories.forEach(category => {
    // filter data for current category
    const filteredData = userIncomeData.filter(record => record.category === category)
    // calculate total amount for filtered data
    const totalAmount = filteredData.reduce((sum, record) => sum + record.amount, 0)

    const categoryTotalObject = { category: category, totalAmount: totalAmount }

    categoryTotals.push(categoryTotalObject)
  })

  return categoryTotals
}

export { calculateTotalIncome, calculateIncomeByCategory }
