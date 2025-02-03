import supabase from '@/supabaseClient'
import { useUserStore, UserState } from '@/stores/user'

export default function useDeleteExpense() {
  const user = useUserStore((state: UserState) => state.user)
  const deleteExpenseFromStore = useUserStore((state: UserState) => state.deleteExpense)

  async function removeExpense(expID: number) {
    if (!user) return

    try {
      const { error } = await supabase.from('expenses').delete().eq('id', expID)

      if (error) {
        console.error('Failed to delete expense:', error.message)
        return
      }

      deleteExpenseFromStore(expID)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return removeExpense
}
