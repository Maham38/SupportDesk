import { Link } from 'react-router-dom'

export default function TicketCard({ ticket }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div style={{ flex: 1 }}>
          <h5 className="mb-1">{ticket.subject}</h5>
          <div className="text-muted small mb-2"><strong>{ticket.customerName}</strong> • {ticket.customerEmail}</div>
          <p className="mb-2 text-truncate" style={{ maxWidth: '70ch' }}>{ticket.description}</p>

          <div className="d-flex gap-2">
            <span className="badge bg-secondary">{ticket.priority}</span>
            <span className="badge bg-info text-dark">{ticket.status}</span>
          </div>
        </div>

        <div className="ms-3 d-flex flex-column align-items-end">
          {ticket.urgent && <span className="badge bg-danger mb-2">URGENT</span>}
          <Link to={`/tickets/${ticket._id}`} className="btn btn-primary btn-sm">View</Link>
        </div>
      </div>
    </div>
  )
}