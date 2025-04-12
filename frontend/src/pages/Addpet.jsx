import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AddPetForm = () => {
  const { user, addPet } = useAuth();
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: "",
    species: "",
    breed: "",
    description: "",
    gender: "",
    size: "",
    health: "",
    age: "",
    temperament: "",
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if user is not a pet owner or has already completed onboarding
  useEffect(() => {
    if (user) {
      if (user.role === 'veterinarian') {
        navigate('/dashboard');
      } else if (user.role === 'pet_owner' && user.onboardingStep >= 2) {
        navigate('/dashboard');
      } else if (user.role === 'pet_owner' && user.onboardingStep === 0) {
        navigate('/personal-info');
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Create a copy of the pet data to ensure we don't modify the state directly
      const formattedPetData = { ...petData };

      // Ensure gender is lowercase to match the enum values in the backend
      if (formattedPetData.gender) {
        formattedPetData.gender = formattedPetData.gender.toLowerCase();
      }

      await addPet(formattedPetData);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to add pet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden p-8">
        {/* Header */}
        <div className="bg-green-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Your Pet</h2>
          <p className="text-sm text-gray-600">Tell us about your furry friend</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Upload your Pet's image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="pet-image"
            />
            <label
              htmlFor="pet-image"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-500">Click to upload image</span>
            </label>
            {petData.image && (
              <div className="mt-4">
                <img src={petData.image} alt="Pet preview" className="h-32 mx-auto rounded-lg" />
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Pet Name</label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#3B9C91] focus:border-[#3B9C91]"
              placeholder="Enter pet name"
            />
          </div>

          {/* Species and Breed */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Species and Breed</label>
            <div className="flex gap-4 mb-3">
              {['Cat', 'Dog', 'Mixed'].map((species) => (
                <button
                  key={species}
                  type="button"
                  onClick={() => setPetData(prev => ({ ...prev, species }))}
                  className={`flex-1 py-2 px-4 rounded-lg border ${petData.species === species ? 'border-[#3B9C91] bg-[#3B9C91] text-white' : 'border-gray-300 bg-white'}`}
                >
                  {species}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="breed"
              value={petData.breed}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#3B9C91] focus:border-[#3B9C91]"
              placeholder="Enter breed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={petData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#3B9C91] focus:border-[#3B9C91]"
              placeholder="Tell us about your pet"
            ></textarea>
          </div>

          {/* Gender and Size */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <div className="flex gap-3">
                {['Male', 'Female'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setPetData(prev => ({ ...prev, gender: gender.toLowerCase() }))}
                    className={`flex-1 py-2 px-4 rounded-lg border ${petData.gender === gender.toLowerCase() ? 'border-[#3B9C91] bg-[#3B9C91] text-white' : 'border-gray-300 bg-white'}`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Size</label>
              <select
                name="size"
                value={petData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#3B9C91] focus:border-[#3B9C91]"
              >
                <option value="">Select size</option>
                {['Small', 'Medium', 'Large'].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Health and Age */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Health</label>
              <select
                name="health"
                value={petData.health}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#3B9C91] focus:border-[#3B9C91]"
              >
                <option value="Unknown">Unknown</option>
                {['Excellent', 'Good', 'Fair', 'Poor'].map(health => (
                  <option key={health} value={health}>{health}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Age</label>
              <div className="flex gap-3">
                {['Unknown', 'Young', 'Adult', 'Senior'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setPetData(prev => ({ ...prev, age }))}
                    className={`flex-1 py-2 px-4 rounded-lg border ${petData.age === age ? 'border-[#3B9C91] bg-[#3B9C91] text-white' : 'border-gray-300 bg-white'}`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Temperament */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Temperament</label>
            <select
              name="temperament"
              value={petData.temperament}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#3B9C91] focus:border-[#3B9C91]"
            >
              <option value="Unknown">Unknown</option>
              {['Friendly', 'Shy', 'Energetic', 'Calm', 'Aggressive'].map(temp => (
                <option key={temp} value={temp}>{temp}</option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#3B9C91] rounded-lg text-white font-medium hover:bg-[#2f7d75] disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;