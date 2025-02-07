import { Income } from '@/stores/user'

function calculateTotalIncome(data: Income[]): number {
  const totalIncome = data.reduce((acc, currentValue) => acc + currentValue.amount, 0)

  return totalIncome
}

function calculateIncomeByCategory(data: Income[]) {
  const test = [...new Set(data.map(record => record.category))]

  //   const amountArr = test.map((record) =>
  //     if (record.includes)
  // )

  const amountArr = data.map(record => {
    if (record.category.includes(test)) {
      console.log('working')
    }
  })

  console.log(test)
}

export { calculateTotalIncome, calculateIncomeByCategory }
