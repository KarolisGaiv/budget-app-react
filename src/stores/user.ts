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
  setExpenses: (expenses: Expense[]) => void
  addExpense: (expense: Expense) => void
  removeExpense: (expenseId: number) => void
  addCategory: (category: Category) => void
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
        setExpenses: expenses => set({ expenses }),
        addExpense: expense =>
          set(state => ({
            expenses: [...state.expenses, expense],
          })),
        removeExpense: expenseId =>
          set(state => ({
            expenses: state.expenses.filter(expense => expense.id !== expenseId),
          })),
        addCategory: category =>
          set(state => ({
            categories: [...state.categories, category],
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
