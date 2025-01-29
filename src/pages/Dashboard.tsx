import { useUserStore, UserState } from '@/stores/user'
import useCategories from '@/hooks/useCategories'
import CategoryForm from '@/components/CategoryForm'
import useDeleteCategory from '@/hooks/useDeleteCategory'

export default function Dashboard() {
  const user = useUserStore((state: UserState) => state.user)
  useCategories()
  const userCategories = useUserStore((state: UserState) => state.categories)
  const removeCategory = useDeleteCategory()

  function handleCategoryDelete(id: number) {
    removeCategory(id)
  }

  if (!user) {
    return <p>Please log in to access the dashboard.</p>
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <p>Welcome, {user.email}</p>
        <h2>Your categories</h2>
        <ul>
          {userCategories.map(category => {
            return (
              <li key={category.id}>
                {category.name}
                <button onClick={() => handleCategoryDelete(category.id)}>Delete Category</button>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <CategoryForm />
      </div>
    </div>
  )
}
