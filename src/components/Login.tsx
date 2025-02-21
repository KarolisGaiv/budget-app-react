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
      <div>
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

      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form>
  )
}
