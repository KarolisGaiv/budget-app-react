import { useState } from 'react'
import useAddIncome from '@/hooks/useAddIncome'

export default function IncomeForm() {
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Use the custom hook
  const addIncome = useAddIncome()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !category || !date) {
      setError('All fields are required.')
      return
    }

    // Create income object to pass to the hook
    const incomeDetails = { amount, category, date }

    // Use the custom hook to add income
    await addIncome(incomeDetails)

    // Reset form state
    setAmount(0)
    setCategory('')
    setDate('')
    setError('')
  }

  return (
    <div className="card">
      <h3>Add New Income</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (EUR)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <button className="my-8" type="submit">
          Add Income
        </button>
      </form>
    </div>
  )
}
