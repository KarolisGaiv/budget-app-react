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
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add Expense to {categoryName}</h3>

      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value) || '')}
          placeholder="Enter amount"
          required
        />
      </label>

      <label>
        Currency:
        <select value={currency} onChange={e => setCurrency(e.target.value as 'USD' | 'EUR')}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </label>

      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>

      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional"
        />
      </label>

      <div className="flex gap-2">
        <button type="submit" className="button success">
          Save Expense
        </button>
        <button type="button" onClick={onClose} className="button secondary">
          Cancel
        </button>
      </div>
    </form>
  )
}
