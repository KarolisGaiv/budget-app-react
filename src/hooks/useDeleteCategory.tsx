import supabase from '@/supabaseClient'
import { useUserStore, UserState } from '@/stores/user'

export default function useDeleteCategory() {
  const user = useUserStore((state: UserState) => state.user)
  const deleteCategoryFromStore = useUserStore((state: UserState) => state.removeCategory)

  async function removeCategory(categoryID: number) {
    if (!user) return

    try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryID)

      if (error) {
        console.error('Failed to delete category:', error.message)
        return
      }

      deleteCategoryFromStore(categoryID)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return removeCategory
}
