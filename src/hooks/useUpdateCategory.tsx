import supabase from '@/supabaseClient'
import { useUserStore, UserState } from '@/stores/user'

export default function useUpdateCategory() {
  const updateCategoryInStore = useUserStore((state: UserState) => state.updateCategory) //

  async function updateCategory(categoryID: number, newName: string) {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: newName })
        .eq('id', categoryID)

      if (error) {
        console.error('Failed to delete category:', error.message)
        return
      }

      updateCategoryInStore(categoryID, newName)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return updateCategory
}
