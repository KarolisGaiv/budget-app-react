import { useState } from 'react'
import useAddIncome from '@/hooks/useAddIncome'

interface IncomeFormProps {
  preselectedCategory?: string
  onClose: () => void
  isNewCategory?: boolean
}

export default function IncomeForm({
  preselectedCategory,
  onClose,
  isNewCategory,
}: IncomeFormProps) {
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]) // Default date is today
  const [error, setError] = useState<string>('')

  const addIncome = useAddIncome()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const categoryToSend = preselectedCategory || category
    const amountToSend = isNewCategory ? 0 : amount // Amount is 0 if new category mode
    const dateToSend = date

    if (!categoryToSend && isNewCategory) {
      // Only category is required in "Add Category" mode
      setError('Category name is required.')
      return
    }

    if (!amountToSend && !isNewCategory) {
      // Amount, and date are required in "Add Income" mode
      setError('Amount is required.')
      return
    }

    if (!dateToSend && !isNewCategory) {
      setError('Date is required.')
      return
    }

    await addIncome({ amount: amountToSend, category: categoryToSend, date: dateToSend })

    setAmount(0)
    setCategory('')
    setDate(new Date().toISOString().split('T')[0])
    setError('')
    onClose() // Close modal after submission
  }

  return (
    <div className="text-white">
      {error && <div className="error text-red-500 mb-4">{error}</div>}{' '}
      <form onSubmit={handleSubmit}>
        {!isNewCategory && ( // Render amount field ONLY if user selects an existing category
          <div className="form-group mb-4">
            {' '}
            <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
              Amount (EUR)
            </label>{' '}
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
              className="shadow appearance-none border rounded w-full p-2 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}

        {isNewCategory && (
          <div className="form-group mb-4">
            {' '}
            <label htmlFor="category" className="block text-gray-300 text-sm font-bold mb-2">
              Category Name
            </label>{' '}
            <input
              type="text"
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required={true}
              className="shadow appearance-none border rounded w-full p-2 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder={'Enter category name'}
            />
          </div>
        )}

        {!isNewCategory && ( // Render date field ONLY if user selects an existing category
          <div className="form-group mb-4">
            {' '}
            <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">
              Date
            </label>{' '}
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full p-2 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {' '}
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {' '}
            {isNewCategory ? 'Add Category' : 'Add Income'}
          </button>
        </div>
      </form>
    </div>
  )
}
