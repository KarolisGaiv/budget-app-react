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
    <div className="container">
      <header className="mainHeader">
        <h1>Dashboard</h1>
      </header>

      <div className="card">
        <p>Welcome, {user.email}</p>
        <h2>Your Categories</h2>
        <ul>
          {userCategories.map(category => {
            return (
              <li key={category.id} className="flex flex-row justify-between items-center">
                <span>{category.name}</span>
                <button
                  onClick={() => handleCategoryDelete(category.id)}
                  className="button primary"
                >
                  Delete Category
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="card">
        <CategoryForm />
      </div>
    </div>
  )
}
