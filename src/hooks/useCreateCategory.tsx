import supabase from '@/supabaseClient'
import { useUserStore, UserState } from '@/stores/user'

export default function useCreateCategory() {
  const user = useUserStore((state: UserState) => state.user)
  const addCategory = useUserStore((state: UserState) => state.addExpenseCategory)

  const createCategory = async (categoryName: string) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: categoryName, user_id: user.id }])
        .select()
        .single()

      if (error) {
        console.error('Failed to create category:', error.message)
        return
      }

      if (data) {
        addCategory(data)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return createCategory
}
