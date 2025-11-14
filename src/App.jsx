import { useState } from 'react'

function App() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    experience_level: 'Beginner',
    goals: '',
    availability: '',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch(`${baseUrl}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || `Request failed: ${res.status}`)
      }

      const data = await res.json()
      setStatus({ type: 'success', message: 'Application received! We will contact you soon.', id: data.id })
      setForm({
        full_name: '',
        email: '',
        phone: '',
        experience_level: 'Beginner',
        goals: '',
        availability: '',
        notes: ''
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold">GI</div>
          <span className="text-xl font-semibold text-gray-800">Coach Griffin Fitness</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-gray-600">
          <a href="#programs" className="hover:text-gray-900">Programs</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#apply" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Apply</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="grid md:grid-cols-2 gap-10 items-center py-10 md:py-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Personal Training that actually fits your life
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              One-on-one coaching, custom programming, and accountability designed around your goals—fat loss, strength, or performance.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#apply" className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Apply for Coaching</a>
              <a href="/test" className="px-5 py-3 rounded-lg bg-white border text-gray-700 hover:bg-gray-50">Check Backend</a>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700">
              <li className="flex items-center gap-2">✅ Customized Programs</li>
              <li className="flex items-center gap-2">✅ Nutrition Guidance</li>
              <li className="flex items-center gap-2">✅ Mobility & Rehab</li>
              <li className="flex items-center gap-2">✅ Weekly Check-ins</li>
            </ul>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-sm p-6 border">
            <div className="aspect-video rounded-xl bg-gradient-to-tr from-indigo-200 to-blue-200 flex items-center justify-center text-indigo-800 font-semibold">
              Transform your potential
            </div>
          </div>
        </section>

        <section id="apply" className="py-12">
          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Apply for Personal Training</h2>
            <p className="text-gray-600 mt-1">Fill out the quick form and we’ll reach out within 24 hours.</p>

            {status && (
              <div className={`mt-4 p-3 rounded border ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="+1 555 123 4567"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                <select
                  name="experience_level"
                  value={form.experience_level}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Goals</label>
                <textarea
                  name="goals"
                  value={form.goals}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tell me about your goals (fat loss, strength, performance...)"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="e.g., Mon/Wed/Fri mornings"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                <input
                  type="text"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Injuries, preferences, etc."
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-between gap-4 mt-2">
                <p className="text-sm text-gray-500">Submitting to: <span className="font-mono">{baseUrl}/api/applications</span></p>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-3 rounded-lg text-white font-semibold ${submitting ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section id="about" className="py-10 text-center text-gray-600">
          <p>CSCS-certified coach with 10+ years helping clients move better, get stronger, and feel amazing.</p>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Coach Griffin Fitness. All rights reserved.
      </footer>
    </div>
  )
}

export default App
