import React, { useState } from 'react'

interface BudgetModalProps {
  onClose: () => void
}

function BudgetModal({ onClose }: BudgetModalProps) {
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
        <h1 className=" text-preset-1">Add New Budget</h1>
        <button className="text-red-700" onClick={onClose}>
          Close
        </button>
      </header>
      <span className="text-preset-4">
        Choose a category to set a spending budget. These categories can help you monitor spending.
      </span>
      <form onSubmit={handleSubmit} className="mt-4 flex-col form-container">
        <div className="flex flex-col">
          <label htmlFor="budgetCategory" className="text-preset-5-bold">
            Budget Category
          </label>
          <input
            className="rounded-lg text-preset-4 placeholder:text-gray-900"
            value={budgetCategory}
            type="text"
            id="budgetCategory"
            required={true}
            placeholder="Enter Budget Category Name"
            onChange={e => setBudgetCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-preset-5-bold">
            Maximum Spend
          </label>
          <input
            className="rounded-lg text-preset-4"
            type="number"
            id="amount"
            required={true}
            placeholder="e.g. 2000"
            value={budgetAmount}
            onChange={e => setBudgetAmount(e.target.value)}
            min={0}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="themeColor" className="text-preset-5-bold">
            Theme
          </label>
          <select
            name="themeColor"
            id="themeColor"
            onChange={e => setThemeColor(e.target.value)}
            className="rounded-lg text-preset-4"
          >
            {colorTypes.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full">
          <button
            type="submit"
            className="bg-gray-900 p-4 rounded-xl text-preset-4-bold text-white"
          >
            Add Budget
          </button>
        </div>
      </form>
    </div>
  )
}

export default BudgetModal
