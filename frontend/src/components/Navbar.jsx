import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const loc = useLocation()

  return (
    <header className="app-header border-bottom bg-white py-3">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="text-decoration-none">
          <h4 className="mb-0 fw-semibold text-dark">SupportDesk</h4>
        </Link>

        <nav   className="d-flex align-items-center gap-2">
          <Link className={`btn btn-sm border-0 rounded-3 px-3 fw-medium ${
              loc.pathname === '/' 
                ? 'bg-primary-subtle text-primary' 
                : 'text-secondary bg-transparent'
            }`} to="/">Dashboard</Link>
          <Link className={`btn btn-sm border-0 rounded-3 px-3 fw-medium ${
              loc.pathname === '/tickets' 
                ? 'bg-primary-subtle text-primary' 
                : 'text-secondary bg-transparent'
            }`} to="/tickets">Tickets</Link>
          <Link className="btn btn-sm btn-dark rounded-3 px-3 fw-medium ms-2" to="/create">New Ticket</Link>
        </nav>
      </div>
    </header>
  )
}
