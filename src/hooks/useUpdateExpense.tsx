import supabase from '@/supabaseClient'
import { useUserStore, UserState, Expense } from '@/stores/user'

export default function useUpdateExpense() {
  const updateExpenseInUserStore = useUserStore((state: UserState) => state.updateExpenseRecord)

  async function updateRecord(details: Partial<Expense>): Promise<void> {
    try {
      const { error } = await supabase.from('expenses').update(details).eq('id', details.id)

      if (error) {
        console.error('Failed to update expense: ', error.message)
        return
      }

      updateExpenseInUserStore(details)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return updateRecord
}
