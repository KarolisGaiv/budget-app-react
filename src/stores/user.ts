import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Expense {
  id: number
  user_id: string
  amount: number
  currency: 'USD' | 'EUR'
  category: string
  date: string
  description?: string
}

interface Category {
  id: number
  name: string
  user_id: string
}

interface User {
  id: string
  email: string
}

export interface UserState {
  user: User | null
  categories: Category[]
  expenses: Expense[]
  setUser: (user: User | null) => void
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  removeCategory: (categoryID: number) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        categories: [],
        expenses: [],
        setUser: user => set({ user }),
        setCategories: categories => set({ categories }),
        addCategory: category =>
          set(state => ({
            categories: [...state.categories, category],
          })),
        removeCategory: categoryID =>
          set(state => ({
            categories: state.categories.filter(category => category.id !== categoryID),
          })),
      }),
      {
        name: 'user-store',
        partialize: state => ({
          user: state.user,
          categories: state.categories,
          expenses: state.expenses,
        }),
      },
    ),
  ),
)
