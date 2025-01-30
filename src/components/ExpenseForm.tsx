import { useState } from 'react'
import { useUserStore, UserState } from '@/stores/user'
import useCreateExpense from '@/hooks/useCreateExpense '

interface ExpenseFormProps {
  categoryName: string
  onClose: () => void
}

export default function ExpenseForm({ categoryName, onClose }: ExpenseFormProps) {
  const user = useUserStore((state: UserState) => state.user)
  const addExpense = useCreateExpense()

  const [amount, setAmount] = useState<number | ''>('')
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD')
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState<string>('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!user) return

    if (!amount) {
      alert('Please enter an amount.')
      return
    }

    addExpense({
      amount,
      currency,
      date,
      category: categoryName,
      user_id: user?.id,
    })

    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg"
    >
      <h3 className="text-2xl font-semibold text-center mb-6">Add Expense to {categoryName}</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value) || '')}
            placeholder="Enter amount"
            required
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Currency:</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as 'USD' | 'EUR')}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Optional"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 justify-between">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Expense
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
