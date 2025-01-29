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
    <form onSubmit={handleLogin} className="form-widget">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      {error && <p>{error}</p>}
    </form>
  )
}
