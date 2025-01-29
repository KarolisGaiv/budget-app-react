import { useUserStore, UserState } from '@/stores/user'
import useCategories from '@/hooks/useCategories'

export default function Dashboard() {
  const user = useUserStore((state: UserState) => state.user)
  useCategories()
  const userCategories = useUserStore((state: UserState) => state.categories)

  console.log(userCategories)

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={() => console.log('test click')}>Sign Out</button>
        </div>
      ) : (
        <p>Please log in to access the dashboard.</p>
      )}
    </div>
  )
}
