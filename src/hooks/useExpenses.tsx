import { useEffect } from 'react'
import supabase from '@/supabaseClient'
import { UserState, useUserStore } from '@/stores/user'

export default function useExpenses() {
  const user = useUserStore((state: UserState) => state.user)
  const setExpenses = useUserStore((state: UserState) => state.setExpenses)

  useEffect(() => {
    async function loadExpenses() {
      if (!user) {
        setExpenses([])
        return
      }

      const { data, error } = await supabase.from('expenses').select('*').eq('user_id', user.id)

      if (error) {
        setExpenses([])
        console.error(error)
        return
      }
      setExpenses(data)
    }

    loadExpenses()
  }, [setExpenses, user])
}
