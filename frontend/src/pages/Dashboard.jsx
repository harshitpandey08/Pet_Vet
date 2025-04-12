import { Activity, Bell, FileText, Heart, LogOut, MessageSquare, Search, Settings, Thermometer, User, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboardData } from '../services/dashboardService';

const PetVetDashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Stress level');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    activityPercentage: 0,
    sleepPercentage: 0,
    wellnessPercentage: 0,
    healthData: [],
    appointments: [],
    chatMessages: []
  });

  const handleLogout = () => {
    // Clear local storage or any auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('pet');
    // Redirect to login page
    navigate('/login'); 
    window.location.reload();
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-teal-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="p-4 bg-white text-gray-800 rounded-lg mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-teal-600 font-bold">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <path d="M10 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor"/>
              <path d="M14 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor"/>
              <path d="M16 13c-.55 0-1-.45-1-1 0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2 0 .55-.45 1-1 1s-1-.45-1-1c0-2.21 1.79-4 4-4h2c2.21 0 4 1.79 4 4 0 .55-.45 1-1 1z" fill="currentColor"/>
            </svg>
            <span>Pet Vet</span>
          </div>

          <div className="relative w-80">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              placeholder="Search"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <User className="h-full w-full p-1 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 p-4 border-r border-gray-200">
            <div className="space-y-6">
              <div>
                <div className="mb-3 text-gray-500 font-medium text-xs uppercase tracking-wider">
                </div>
                <ul className="space-y-2">
                  <li>
                    <div
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center p-2 bg-teal-100 text-teal-600 rounded-md cursor-pointer"
                    >
                      <div className="w-5 h-5 mr-2 text-teal-600">
                        <Activity className="w-full h-full" />
                      </div>
                      Dashboard
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate('/pet-profile')}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <User className="w-5 h-5 mr-2 text-gray-500" />
                      Pet profile
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-3 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  ANALYTICS
                </div>
                <ul className="space-y-2">
                  <li>
                    <div
                      onClick={() => navigate('/health-monitoring')}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Activity className="w-5 h-5 mr-2 text-gray-500" />
                      Health monitoring
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate('/appointments')}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <FileText className="w-5 h-5 mr-2 text-gray-500" />
                      Appointments
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-3 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  SCHEDULE
                </div>
                <ul className="space-y-2">
                  <li>
                    <div
                      onClick={() => navigate('/chat')}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
                      Chat
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate('/appointments')}
                      className="flex items-center justify-between p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-gray-500" />
                        Appointments
                      </div>
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {dashboardData.pendingAppointments || 0}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2">
                  <li>
                    <div
                      onClick={() => navigate('/settings')}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Settings className="w-5 h-5 mr-2 text-gray-500" />
                      Settings
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navigate('/documentation')}
                      className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <FileText className="w-5 h-5 mr-2 text-gray-500" />
                      Documentation
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <a
                  onClick={handleLogout}
                  className="flex items-center p-2 text-red-500 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Log out
                </a>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Activity Card */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-500 font-medium">ACTIVITY</div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative h-32 w-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="10"
                        strokeDasharray="282.6"
                        strokeDashoffset={282.6 - (282.6 * dashboardData.activityPercentage / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{dashboardData.activityPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sleep Card */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-500 font-medium">SLEEP</div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none">
                      <option>Weekly</option>
                      <option>Daily</option>
                      <option>Monthly</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative h-32 w-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="10"
                        strokeDasharray="282.6"
                        strokeDashoffset={282.6 - (282.6 * dashboardData.sleepPercentage / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{dashboardData.sleepPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wellness Card */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-500 font-medium">WELLNESS</div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none">
                      <option>Weekly</option>
                      <option>Daily</option>
                      <option>Monthly</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative h-32 w-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="10"
                        strokeDasharray="282.6"
                        strokeDashoffset={282.6 - (282.6 * dashboardData.wellnessPercentage / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{dashboardData.wellnessPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Monitoring Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-500 font-medium">HEALTH MONITORING</div>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${
                    selectedTab === 'Stress level' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTab('Stress level')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Stress level
                </button>
                <button
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${
                    selectedTab === 'Pulse' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTab('Pulse')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Pulse
                </button>
                <button
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${
                    selectedTab === 'Temperature' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTab('Temperature')}
                >
                  <Thermometer className="h-4 w-4 mr-2" />
                  Temperature
                </button>
                <button
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${
                    selectedTab === 'Calories burned' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTab('Calories burned')}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Calories burned
                </button>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.healthData || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Appointments */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-700 font-medium">Appointments</div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none">
                      <option>By type</option>
                      <option>By date</option>
                      <option>By veterinar</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Veterinar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(dashboardData.appointments || []).map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.name}</div>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                appointment.type === 'Overdue'
                                  ? 'bg-red-100 text-red-500'
                                  : appointment.type === 'Noncore'
                                  ? 'bg-orange-100 text-orange-500'
                                  : 'bg-green-100 text-green-500'
                              }`}
                            >
                              {appointment.type}
                            </span>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{appointment.date}</div>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <div
                              className={`text-sm ${
                                appointment.veterinar === 'Find veterinar'
                                  ? 'text-white bg-teal-500 px-2 py-1 rounded'
                                  : 'text-gray-900'
                              }`}
                            >
                              {appointment.veterinar}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chat */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-gray-700 font-medium mb-4">CHAT</div>

                <div className="space-y-4">
                  {(dashboardData.chatMessages || []).map((message) => (
                    <div key={message.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <User className="h-full w-full p-1 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">{message.name}</p>
                          <p className="text-sm text-gray-500">{message.time}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">{message.message}</p>
                          {message.unread > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {message.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetVetDashboard;
