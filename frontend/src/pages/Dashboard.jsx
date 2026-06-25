import { useEffect, useState } from 'react'
import api from '../api/axios'
import StatsCard from '../components/StatsCard'
import TicketList from './TicketList'

export default function Dashboard() {
  const [stats, setStats] = useState({})

  useEffect(() => {
    api.get('/dashboard').then((res) => setStats(res.data)).catch(() => {})
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted">Overview of support tickets</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3"><StatsCard title="Total" value={stats.total} color="#495057" /></div>
        <div className="col-6 col-md-3"><StatsCard title="Open" value={stats.open} color="#0d6efd" /></div>
        <div className="col-6 col-md-3"><StatsCard title="In Progress" value={stats.inProgress} color="#ffc107" /></div>
        <div className="col-6 col-md-3"><StatsCard title="Resolved" value={stats.resolved} color="#198754" /></div>
      </div>

      <div className="mb-3">
        <h5>Recent Tickets</h5>
        <TicketList />
      </div>
    </div>
  )
}
