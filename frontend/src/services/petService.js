import api from './api';

// Add a new pet
export const addPet = async (petData) => {
  const response = await api.post('/pets', petData);
  if (response.data) {
    localStorage.setItem('pet', JSON.stringify(response.data));
  }
  return response.data;
};

// Get all pets for a user
export const getPets = async () => {
  const response = await api.get('/pets');
  return response.data;
};

// Get a pet by ID
export const getPetById = async (id) => {
  const response = await api.get(`/pets/${id}`);
  return response.data;
};

// Update a pet
export const updatePet = async (id, petData) => {
  const response = await api.put(`/pets/${id}`, petData);
  return response.data;
};

// Delete a pet
export const deletePet = async (id) => {
  const response = await api.delete(`/pets/${id}`);
  return response.data;
};
