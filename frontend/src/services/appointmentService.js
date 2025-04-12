import api from './api';

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

// Get all appointments for a user
export const getAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

// Get an appointment by ID
export const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

// Update an appointment
export const updateAppointment = async (id, appointmentData) => {
  const response = await api.put(`/appointments/${id}`, appointmentData);
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};
