import supabase from '@/supabaseClient'
import { useUserStore } from '@/stores/user'

export const signUp = async (email: string, password: string) => {
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code, error.message)
    return { error: error.message }
  }

  return { success: 'Check your email for a verification link.' }
}

export const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }

  // Fetch user session to ensure it's properly set
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('Failed to fetch session:', sessionError.message)
    return { error: 'Failed to retrieve session after login.' }
  }

  if (sessionData.session?.user) {
    useUserStore.getState().setUser({
      id: sessionData.session.user.id,
      email: sessionData.session.user.email,
    })
  } else {
    console.error('No user found in session data.')
    return { error: 'Session retrieval failed.' }
  }

  return { success: true }
}

export const forgotPassword = async (email: string) => {
  if (!email) {
    return { error: 'Email is required' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?redirect_to=/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return { error: 'Could not reset password' }
  }

  return { success: 'Check your email for a reset link.' }
}

export const resetPassword = async (password: string, confirmPassword: string) => {
  if (!password || !confirmPassword) {
    return { error: 'Password and confirm password are required' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) return { error: 'Password update failed' }

  return { success: 'Password updated' }
}

export const signOut = async () => {
  await supabase.auth.signOut()
}
