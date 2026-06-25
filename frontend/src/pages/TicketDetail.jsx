import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function TicketDetail(){
  const { id } = useParams()
  const nav = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(()=>{
    api.get(`/tickets/${id}`).then(r=>{
      setTicket(r.data)
      setStatus(r.data.status)
    }).catch(()=>{})
  },[id])

  const updateStatus = async () => {
    if (!ticket) return
    setSaving(true)
    try {
      const res = await api.patch(`/tickets/${id}/status`, { status })
      setTicket(res.data)
      setStatus(res.data.status)
    } catch (err) {
      // optionally show error
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if(!ticket) return <div className="text-muted">Loading...</div>

  return (
  <div className="row">
    
    {/* LEFT SIDE - Ticket Info */}
    <div className="col-lg-8 mb-3">
      
      <div className="card p-4">
        
        {/* Header */}
        <div className="mb-3">
          <h3 className="mb-1">{ticket.subject}</h3>

          <div className="text-muted">
            {ticket.customerName} • {ticket.customerEmail}
          </div>

          <span className="badge bg-secondary mt-2">
            Priority: {ticket.priority}
          </span>

          {ticket.urgent && (
            <span className="badge bg-danger ms-2">
              URGENT
            </span>
          )}
        </div>

        <hr />

        {/* Description */}
        <h6>Description</h6>
        <p className="text-muted">
          {ticket.description}
        </p>

        <hr />

        {/* Activity History (if you added it) */}
        <h6>Activity History</h6>

        {ticket.activityHistory?.length > 0 ? (
          <ul className="list-group">
            {ticket.activityHistory.map((a, i) => (
              <li key={i} className="list-group-item small">
                {a.action}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted small">No activity yet</p>
        )}

      </div>
    </div>

    {/* RIGHT SIDE - DETAILS + ACTIONS */}
    <div className="col-lg-4">
      
      <div className="card p-3 shadow-sm">

        <h6 className="mb-3">Ticket Details</h6>

        <dl className="row mb-3">
          <dt className="col-5">Name</dt>
          <dd className="col-7">{ticket.customerName}</dd>

          <dt className="col-5">Email</dt>
          <dd className="col-7">{ticket.customerEmail}</dd>

          <dt className="col-5">Status</dt>
          <dd className="col-7">
            <strong>{ticket.status}</strong>
          </dd>

          <dt className="col-5">Created</dt>
          <dd className="col-7">
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString()
              : "-"}
          </dd>

          <dt className="col-5">Updated</dt>
          <dd className="col-7">
            {ticket.updatedAt
              ? new Date(ticket.updatedAt).toLocaleString()
              : "-"}
          </dd>
        </dl>

        <hr />

        {/* STATUS UPDATE */}
        <div className="mb-2">
          <label className="form-label small">
            Change Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <button
          className="btn btn-primary w-100 mt-2"
          disabled={saving || status === ticket.status}
          onClick={updateStatus}
        >
          {saving ? "Updating..." : "Update Status"}
        </button>

      </div>
    </div>
  </div>
);
}