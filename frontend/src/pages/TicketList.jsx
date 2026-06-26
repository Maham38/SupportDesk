import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import TicketCard from "../components/TicketCard";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef();

  useEffect(() => {
    // debounce API calls for better UX
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = {};
      if (search) params.search = search;
      if (priority) params.priority = priority;
      if (status) params.status = status;

      api
        .get("/tickets", { params })
        .then((res) => setTickets(res.data))
        .catch(() => setTickets([]))
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(debounceRef.current);
  }, [search, priority, status]);

  const clearFilters = () => {
    setSearch("");
    setPriority("");
    setStatus("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Tickets</h2>
        <div className="text-muted">{tickets.length} results</div>
      </div>

      <div className="card mb-3 p-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <input className="form-control" placeholder="Search by name, email, or subject..." value={search} onChange={(e)=>setSearch(e.target.value)} />
          </div>

          <div className="col-6 col-md-2">
            <select className="form-select" value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="">All priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <select className="form-select" value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={clearFilters}>Clear</button>
            <a href="/create" className="btn btn-dark rounded-3 px-3 fw-medium ms-2">New Ticket</a>
          </div>
        </div>
      </div>

      {loading && <div className="mb-3 text-muted">Loading...</div>}

      {tickets.length === 0 && !loading && (
        <div className="card p-3 mb-3">No tickets found.</div>
      )}

      {tickets.map((t) => (
        <TicketCard key={t._id} ticket={t} />
      ))}
    </div>
  )
}