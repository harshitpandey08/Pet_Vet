import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AddPet from './pages/Addpet'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PersonalInfo from './pages/PersonalInfo'
import Signup from './pages/Signup'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Temporary routes - these will redirect to Dashboard until implemented  for future use*/}
          <Route path="/pet-profile" element={<Dashboard />} />
          <Route path="/health-monitoring" element={<Dashboard />} />
          <Route path="/appointments" element={<Dashboard />} />
          <Route path="/chat" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/documentation" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;