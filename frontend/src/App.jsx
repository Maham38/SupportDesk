import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import CreateTicket from './pages/CreateTicket'
import TicketList from './pages/TicketList'
import TicketDetail from './pages/TicketDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
