import { useState } from 'react'
import { signIn } from '@/utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn(email, password)
    if (result.error) {
      setError(result.error)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto p-8 bg-white  rounded-lg space-y-4 mt-12"
    >
      <h1 className="flex-auto text-preset-1 mb-8">Login</h1>
      <div className="my-1">
        <label className="block text-preset-5-bold">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-lg"
        />
      </div>

      <div>
        <label className="block text-preset-5-bold">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center gap-4 form-container mb-8">
        <button
          type="submit"
          className=" w-full bg-gray-900 p-4 rounded-xl text-preset-4-bold text-white"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <footer className="flex flex-col items-center">
        <span className="text-preset-4">
          Need to create an account?
          <a className="text-preset-4-bold" href="/register">
            {' '}
            Sign Up
          </a>
        </span>
      </footer>
    </form>
  )
}
