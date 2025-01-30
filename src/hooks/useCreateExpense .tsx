import supabase from '@/supabaseClient'
import { useUserStore, UserState, Expense } from '@/stores/user'

export default function useCreateExpense() {
  const user = useUserStore((state: UserState) => state.user)
  const addExpense = useUserStore((state: UserState) => state.addExpense)

  async function createExpense(expenseData: Omit<Expense, 'id'>) {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([{ ...expenseData, user_id: user.id }])
        .select()
        .single()

      if (error) {
        console.error('Failed to add new expense:', error.message)
        return
      }

      addExpense(data)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return createExpense
}
