import { useState } from 'react'
import useAddIncome from '@/hooks/useAddIncome'

interface IncomeFormProps {
  preselectedCategory?: string
  onClose: () => void
}

export default function IncomeForm({ preselectedCategory, onClose }: IncomeFormProps) {
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState<string>(preselectedCategory || '')
  const [date, setDate] = useState<string>('')
  const [error, setError] = useState<string>('')

  // custom hook to add income to user db and state
  const addIncome = useAddIncome()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || (!category && !preselectedCategory) || !date) {
      setError('All fields are required.')
      return
    }

    await addIncome({ amount, category: preselectedCategory || category, date })

    setAmount(0)
    setDate('')
    setError('')
    onClose() // Close modal after submission
  }

  return (
    <div className="text-white">
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (EUR)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>

        {/* Show category input only if the user is NOT adding to a preselected category */}
        {!preselectedCategory && (
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="bg-gray-600 p-2 rounded">
            Cancel
          </button>
          <button className="bg-blue-500 p-2 rounded" type="submit">
            Add Income
          </button>
        </div>
      </form>
    </div>
  )
}
