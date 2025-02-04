import { useEffect } from 'react'
import supabase from '@/supabaseClient'
import { UserState, useUserStore } from '@/stores/user'

export default function useIncome() {
  const user = useUserStore((state: UserState) => state.user)
  const saveIncomeToStore = useUserStore((state: UserState) => state.setIncome)

  useEffect(() => {
    async function loadIncome() {
      if (!user) {
        saveIncomeToStore([])
        return
      }

      const { data, error } = await supabase.from('income').select('*').eq('user_id', user.id)

      if (error) {
        saveIncomeToStore([])
        console.error(error)
        return
      }

      saveIncomeToStore(data)
    }

    loadIncome()
  }, [saveIncomeToStore, user])
}
