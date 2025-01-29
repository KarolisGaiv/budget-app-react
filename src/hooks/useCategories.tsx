import { useEffect } from 'react'
import supabase from '@/supabaseClient'
import { UserState, useUserStore } from '@/stores/user'

const useCategories = () => {
  const user = useUserStore((state: UserState) => state.user)
  const setCategories = useUserStore((state: UserState) => state.setCategories)

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user) return
      const { data, error } = await supabase.from('categories').select('*').eq('user_id', user.id)

      if (error) {
        console.error(error)
        return
      }
      setCategories(data)
    }

    fetchCategories()
  }, [user, setCategories])

  return null
}

export default useCategories
