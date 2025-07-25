import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signupUser } from '../services/auth'  // Adjust path if needed
import './Auth.scss'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { ok, data } = await signupUser(email, password)

    if (ok) {
      alert('Signup successful')
      navigate('/login')
    } else {
      alert(data.detail || 'Signup failed')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <div className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
