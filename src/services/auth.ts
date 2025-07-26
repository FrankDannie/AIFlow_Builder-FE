const API_BASE = import.meta.env.VITE_API_BASE

export async function loginUser(email: string, password: string) {
  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', password)

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })

  const data = await response.json()
  return { ok: response.ok, data }
}

export async function signupUser(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  return { ok: response.ok, data }
}
