import useFindRecord from '@/hooks/useFindRecord'
import React, { useEffect, useState } from 'react'
import { Expense, Income } from '@/stores/user'
import useDeleteExpense from '@/hooks/useDeleteExpense'

type UpdateRecordFormProps = {
  recordID: number
  type: 'expenses' | 'income'
  onClose: () => void
}

export default function UpdateRecordForm({ recordID, type, onClose }: UpdateRecordFormProps) {
  const [recordDetails, setRecordDetails] = useState<Expense | Income | null>(null)
  const findRecord = useFindRecord()
  const deleteExpense = useDeleteExpense()

  useEffect(() => {
    async function fetchRecord() {
      const recordData = await findRecord(recordID, type)
      setRecordDetails(recordData)
    }

    fetchRecord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordID, type])

  function handleRecordUpdate(e: React.FormEvent) {
    e.preventDefault()
    console.log('record details: ', recordDetails)
  }

  function handleDeleteRecord(recordID: number) {
    deleteExpense(recordID)
  }

  if (!recordDetails) return <div>Loading...</div>

  return (
    <div className="text-white">
      <form onSubmit={handleRecordUpdate}>
        <div className="form-group mb-4">
          <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
            Amount (EUR)
          </label>
          <input
            type="number"
            id="amount"
            value={recordDetails.amount || ''}
            onChange={e =>
              setRecordDetails(
                prev => ({ ...prev, amount: Number(e.target.value) }) as Expense | Income,
              )
            }
            required
            className="shadow appearance-none border rounded w-full p-2 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="category" className="block text-gray-300 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={recordDetails.category || ''}
            disabled={true}
            className="shadow appearance-none border rounded w-full p-2 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category name"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={
              recordDetails.date ? new Date(recordDetails.date).toISOString().split('T')[0] : ''
            }
            onChange={e =>
              setRecordDetails(prev => ({ ...prev, date: e.target.value }) as Expense | Income)
            }
            required
            className="shadow appearance-none border rounded w-full p-2 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => handleDeleteRecord(recordDetails.id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {type === 'income' ? 'Update Income' : 'Update Expense'}
          </button>
        </div>
      </form>
    </div>
  )
}
