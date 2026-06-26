import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import TicketCard from "../components/TicketCard";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
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
      if (sortOrder) params.sortOrder = sortOrder;

      api
        .get("/tickets", { params })
        .then((res) => setTickets(res.data))
        .catch(() => setTickets([]))
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(debounceRef.current);
  }, [search, priority, status, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setPriority("");
    setStatus("");
    setSortOrder("newest");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Tickets</h2>
        <div className="text-muted">{tickets.length} results</div>
      </div>

      <div className="card mb-3 p-2">
        <div className="d-flex flex-column flex-lg-row gap-2 align-items-stretch align-items-lg-center">
          <input
            className="form-control "
            placeholder="Search by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ maxWidth: '180px' }}>
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: '180px' }}>
            <option value="">All statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ maxWidth: '180px' }}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          <div className="d-flex gap-2 ms-lg-auto">
            <button className="btn btn-outline-secondary" onClick={clearFilters}>Clear</button>
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