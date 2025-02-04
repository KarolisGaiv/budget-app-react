import supabase from '@/supabaseClient'
import { useUserStore, UserState, Income } from '@/stores/user'

export default function useAddIncome() {
  const user = useUserStore((state: UserState) => state.user)
  const addIncome = useUserStore((state: UserState) => state.addIncome)

  async function createIncome(incomeDetails: Omit<Income, 'id'>) {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('income')
        .insert([{ ...incomeDetails, user_id: user.id }])
        .select()
        .single()

      if (error) {
        console.error('Failed to add new income:', error.message)
        return
      }

      addIncome(data)
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return createIncome
}
