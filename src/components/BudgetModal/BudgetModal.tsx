import React, { useState } from 'react'

function BudgetModal() {
  const [budgetCategory, setBudgetCategory] = useState<string>('')
  const [budgetAmount, setBudgetAmount] = useState<string>('')
  const [themeColor, setThemeColor] = useState<string>('')
  const colorTypes = ['Green', 'Yellow', 'Cyan', 'Navy', 'Red', 'Purple', 'Turquoise']

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log('testing this budget modal')
    console.log(budgetCategory)
    console.log(budgetAmount)
    console.log(budgetCategory)
    console.log(themeColor)
  }

  return (
    <div className="rounded-lg py-4 bg-white p-8">
      <header className="flex justify-between my-6">
        <h1 className="text-black">Add New Budget</h1>
        <button>Close</button>
      </header>
      <span>
        Choose a category to set a spending budget. These categories can help you monitor spending.
      </span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="budgetCategory">Budget Category</label>
        <input
          value={budgetCategory}
          type="text"
          id="budgetCategory"
          required={true}
          placeholder="Enter Budget Category Name"
          onChange={e => setBudgetCategory(e.target.value)}
        />
        <label htmlFor="amount">Maximum Spend</label>
        <input
          type="number"
          id="amount"
          required={true}
          placeholder="e.g. 2000"
          value={budgetAmount}
          onChange={e => setBudgetAmount(e.target.value)}
          min={0}
        />
        <label htmlFor="themeColor">Theme</label>
        <select name="themeColor" id="themeColor" onChange={e => setThemeColor(e.target.value)}>
          {colorTypes.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <div>
          <button type="submit">Add Budget</button>
        </div>
      </form>
    </div>
  )
}

export default BudgetModal
