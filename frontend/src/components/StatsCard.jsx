export default function StatsCard({ title, value, color }) {
  return (
    <div className="card text-center p-3">
      <div className="card-body">
        <h6 className="text-muted mb-2">{title}</h6>
        <h3 className="mb-0" style={{ color }}>{value ?? 0}</h3>
      </div>
    </div>
  )
}