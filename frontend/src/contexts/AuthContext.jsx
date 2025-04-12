import { createContext, useContext, useEffect, useState } from 'react'
import { completeOnboardingStep1 as completeStep1Service, login as loginService, logout as logoutService, register as registerService } from '../services/authService'
import { addPet as addPetService } from '../services/petService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user')
    const storedPet = localStorage.getItem('pet')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedPet) {
      setPet(JSON.parse(storedPet))
    }

    setLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      // Ensure role is one of the valid enum values
      if (userData.role !== 'pet_owner' && userData.role !== 'veterinarian') {
        userData.role = 'pet_owner'
      }

      const response = await registerService(userData)
      setUser(response)
      setLoading(false)
      return response
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await loginService(email, password)
      setUser(response)
      setLoading(false)
      return response
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || 'Login failed')
      throw err
    }
  }

  const logout = () => {
    logoutService()
    setUser(null)
    setPet(null)
  }

  const completeOnboardingStep1 = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await completeStep1Service(userData)

      // Make sure we update the local user state with the updated user data
      // This ensures the onboardingStep is correctly updated
      setUser(response)

      // Also update localStorage to ensure persistence
      localStorage.setItem('user', JSON.stringify(response))

      setLoading(false)
      return response
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || 'Failed to complete onboarding')
      throw err
    }
  }

  const addPet = async (petData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await addPetService(petData)
      setPet(response)

      // Update user's onboarding step
      if (user) {
        const updatedUser = {
          ...user,
          onboardingStep: 2
        }

        // Update local state
        setUser(updatedUser)

        // Update localStorage to ensure persistence
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }

      setLoading(false)
      return response
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || 'Failed to add pet')
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        pet,
        loading,
        error,
        register,
        login,
        logout,
        addPet,
        completeOnboardingStep1
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
