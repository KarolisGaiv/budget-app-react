import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Expense = {
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

export type Income = {
  id: number
  user_id: string
  amount: number
  category: string
  date: string
}

export type UserState = {
  user: User | null
  categories: Category[]
  expenses: Expense[]
  income: Income[]
  setUser: (user: User | null) => void
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  removeCategory: (categoryID: number) => void
  updateCategory: (categoryID: number, newName: string) => void
  addExpense: (expense: Expense) => void
  setExpenses: (expense: Expense[]) => void
  deleteExpense: (expenseID: number) => void
  setIncome: (income: Income[]) => void
  addIncome: (income: Income) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        categories: [],
        expenses: [],
        income: [],
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
        updateCategory: (categoryID, newName) =>
          set(state => ({
            categories: state.categories.map(category =>
              category.id === categoryID ? { ...category, name: newName } : category,
            ),
          })),
        addExpense: newExpenseRecord =>
          set(state => ({
            expenses: [...state.expenses, newExpenseRecord],
          })),
        setExpenses: expenses => set({ expenses }),
        deleteExpense: expenseID =>
          set(state => ({
            expenses: state.expenses.filter(expense => expense.id !== expenseID),
          })),
        setIncome: income => set({ income }),
        addIncome: newIncome =>
          set(state => ({
            income: [...state.income, newIncome],
          })),
      }),
      {
        name: 'user-store',
        partialize: state => ({
          user: state.user,
          categories: state.categories,
          expenses: state.expenses,
          income: state.income,
        }),
      },
    ),
  ),
)
