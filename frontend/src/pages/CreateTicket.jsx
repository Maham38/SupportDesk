import { useState } from 'react'
import api from '../api/axios'

export default function CreateTicket() {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    subject: '',
    description: '',
    priority: 'Low'
  })

  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()

    setSending(true)
    setMessage(null)
    setErrors({})

    try {
      await api.post('/tickets', form)

      setMessage({ type: 'success', text: 'Ticket created successfully!' })

      setForm({
        customerName: '',
        customerEmail: '',
        subject: '',
        description: '',
        priority: 'Low'
      })
    } catch (err) {
      const backendErrors = err?.response?.data?.errors

      if (backendErrors) {
        const formatted = {}

        backendErrors.forEach((e) => {
          const field = e.path || e.param
          if (field) {
            formatted[field] = e.msg
          }
        })

        setErrors(formatted)
      } else {
        setMessage({
          type: 'danger',
          text: err?.response?.data?.message || 'Failed to create ticket'
        })
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Create Ticket</h3>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={submit} noValidate>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
          />
          {errors.customerName && (
            <small className="text-danger">{errors.customerName}</small>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="customerEmail"
            type="email"
            value={form.customerEmail}
            onChange={handleChange}
            className={`form-control ${errors.customerEmail ? 'is-invalid' : ''}`}
          />
          {errors.customerEmail && (
            <small className="text-danger">{errors.customerEmail}</small>
          )}
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
          />
          {errors.subject && (
            <small className="text-danger">{errors.subject}</small>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
          {errors.description && (
            <small className="text-danger">{errors.description}</small>
          )}
        </div>

        {/* Priority */}
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {errors.priority && (
            <small className="text-danger">{errors.priority}</small>
          )}
        </div>

        {/* Submit */}
        <button
          className="btn  btn-dark rounded-3 px-3 fw-medium ms-2 w-100"
          disabled={sending}
        >
          {sending ? 'Creating Ticket...' : 'Create Ticket'}
        </button>

      </form>
    </div>
  )
}