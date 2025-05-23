import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Foot from "../assets/images/Foot.png";
import GoogleLogo from "../assets/images/google.png";
import { useAuth } from "../contexts/AuthContext";
import Petimg from "../assets/images/pet-dog.png";

const Signup = () => {
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'veterinarian') {
        if (user.onboardingStep === 0) {
          navigate('/personal-info');
        } else {
          navigate('/dashboard');
        }
      } else if (user.role === 'pet_owner') {
        if (user.onboardingStep === 0) {
          navigate('/personal-info');
        } else if (user.onboardingStep === 1) {
          navigate('/add-pet');
        } else {
          navigate('/dashboard');
        }
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) {
      setErrorMessage("Please select a user type");
      return;
    }

    if (!agreeToTerms) {
      setErrorMessage("You must agree to the terms and conditions");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const userData = {
        email,
        password,
        role: userType, // Now userType is already set to 'pet_owner' or 'veterinarian'
        firstName,
        lastName
      };

      await register(userData);

      // Directly navigate to PersonalInfo after successful registration
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex" style={{ backgroundColor: "#5FAFA126" }}>
      {/* Left side with illustration */}
       <div className="w-1/2 pl-20 pr-10 py-10 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <img src={Foot} alt="Pet Vet Logo" className="w-8 h-8" />
            <p className="text-[#439288] font-medium text-lg">Pet Vet</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start">
          <h1 className="text-5xl font-bold mb-2 ml-4">
            <span className="text-[#439288]">Happiness</span>
            <br />
            <span className="text-gray-800">starts here</span>
          </h1>

          <div className="mt-8 w-full max-w-lg ml-4">
            <div className="relative">
              <img
                src={Petimg}
                alt="Pet owner with pets"
                className="w-full rounded-lg"
              />
              <div className="absolute left-1/4 bottom-1/4">
                <div className="bg-green-600 rounded-full p-2 text-white">
                  <span className="text-xl">!</span>
                </div>
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1">
                  <svg width="50" height="30" viewBox="0 0 50 30">
                    <path
                      d="M5,0 Q15,0 20,10 T30,20 T40,5"
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                    />
                    <circle cx="45" cy="5" r="5" fill="red" />
                    <circle cx="35" cy="15" r="4" fill="pink" />
                    <circle cx="25" cy="5" r="3" fill="pink" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Right side with form */}
      <div className="w-1/2 my-6 ml-auto bg-[rgba(95,175,161,0.15)] rounded-l-3xl shadow-xl px-12 py-14 flex items-center justify-center">
        <div className="w-full max-w-sm">

          {/* Paw Logo */}
          <div className="flex justify-center mb-8">
            <img src={Foot} alt="Logo" className="w-16 h-16" />
          </div>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 shadow hover:bg-gray-100 transition mb-5">
            <img src={GoogleLogo} alt="Google Logo" className="h-5 w-5" />
            <span>Sign up with Google</span>
          </button>

          <div className="text-center text-sm text-gray-500 my-5">— OR —</div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-md p-4 cursor-pointer flex flex-col items-center justify-center ${
                    userType === "pet_owner"
                      ? "border-[#030b0a] bg-[#2D746D4D]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("pet_owner")}
                >
                  <div className="text-2xl mb-1">🐾</div>
                  <div className="text-sm font-medium">Pet Owner</div>
                </div>
                <div
                  className={`border rounded-md p-4 cursor-pointer flex flex-col items-center justify-center ${
                    userType === "veterinarian"
                      ? "border-[#030b0a] bg-[#2D746D4D]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("veterinarian")}
                >
                  <div className="text-2xl mb-1">👨‍⚕️</div>
                  <div className="text-sm font-medium">Veterinarian</div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#439288] focus:border-[#439288] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#439288] focus:border-[#439288] sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#439288] focus:border-[#439288] sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#439288] focus:border-[#439288] sm:text-sm"
                  placeholder="Create your password"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center text-sm">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="mr-2 rounded border-gray-300 text-[#439288] focus:ring-[#439288]"
              />
              <label htmlFor="terms" className="text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3B9C91] hover:bg-[#2f7d75] text-white font-semibold py-2.5 rounded-lg shadow-sm text-sm transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={!agreeToTerms || isLoading}
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
                'Sign Up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3B9C91] hover:text-[#2f7d75] font-medium transition">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
