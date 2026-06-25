import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const loc = useLocation()

  return (
    <header className="app-header py-3">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="text-decoration-none">
          <h4 className="mb-0 text-primary">SupportDesk</h4>
        </Link>

        <nav>
          <Link className={`btn btn-sm btn-outline-light me-2 ${loc.pathname === '/' ? 'active' : ''}`} to="/">Dashboard</Link>
          <Link className={`btn btn-sm btn-outline-light me-2 ${loc.pathname === '/tickets' ? 'active' : ''}`} to="/tickets">Tickets</Link>
          <Link className="btn btn-sm btn-primary" to="/create">New Ticket</Link>
        </nav>
      </div>
    </header>
  )
}
