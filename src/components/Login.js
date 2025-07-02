import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/images/home.jpg"; // Adjust the path as necessary
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "./context/user-context";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const { setCurrentUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPasswordDetails, setNewPasswordDetails] = useState({
    newPassword: "",
    retypeNewPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [forgotPasswordUsername, setForgotPasswordUsername] = useState(""); // State for username in forgot password flow
  const [isUsernameValid, setIsUsernameValid] = useState(false); // State to check if entered username exists

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const backHandler = () => {
    setShowPassword(false);
    setUserDetails({ userName: "", password: "" });
    navigate("/");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.userName || !userDetails.password) {
      alert("Please enter both username and password.");
      return;
    }
    const storedUserDetails =
      JSON.parse(localStorage.getItem("userDetailsList")) || [];
    const userExists = storedUserDetails.some(
      (user) =>
        user.userName === userDetails.userName &&
        user.password === userDetails.password
    );
    if (userExists) {
      setShowPassword(false);
      setCurrentUser(userDetails.userName); // Set the current user in context
      setUserDetails({ userName: "", password: "" });
      navigate("/products");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setValidationError("");
    setNewPasswordDetails({ newPassword: "", retypeNewPassword: "" });
  };

  const handleForgotPasswordUsername = () => {
    const storedUserDetails =
      JSON.parse(localStorage.getItem("userDetailsList")) || [];
    const userExists = storedUserDetails.some(
      (user) => user.userName === forgotPasswordUsername
    );

    if (userExists) {
      setIsUsernameValid(true);
      setValidationError("");
    } else {
      setValidationError("Username does not exist.");
    }
  };

  const handleNewPasswordChange = (e) => {
    const { name, value } = e.target;
    setNewPasswordDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{6,12}$/;
    return passwordRegex.test(password);
  };

  const handleSaveNewPassword = () => {
    const { newPassword, retypeNewPassword } = newPasswordDetails;

    if (!validatePassword(newPassword)) {
      setValidationError(
        "Password must be 6-12 characters long and include letters, numbers, and special characters."
      );
      return;
    }

    if (newPassword !== retypeNewPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    const storedUserDetails =
      JSON.parse(localStorage.getItem("userDetailsList")) || [];
    const userIndex = storedUserDetails.findIndex(
      (user) => user.userName === forgotPasswordUsername
    );

    storedUserDetails[userIndex].password = newPassword;
    localStorage.setItem("userDetailsList", JSON.stringify(storedUserDetails));
    alert("Password updated successfully. Please log in.");
    setIsForgotPassword(false);
    setUserDetails({ userName: "", password: "" });
  };

  //console.log(isUsernameValid);

  if (isForgotPassword) {
    if (!isUsernameValid) {
      return (
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${home})` }}
        >
          <h1 className="text-7xl font-bold mb-16 text-white">
            Reset Your Password
          </h1>
          <form className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-blue-500">
              Enter Your Username
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={forgotPasswordUsername}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                onChange={(e) => setForgotPasswordUsername(e.target.value)}
              />
            </div>
            {validationError && (
              <p className="text-red-500 text-sm mb-4">{validationError}</p>
            )}
            <button
              type="button"
              className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full cursor-pointer ${
                !forgotPasswordUsername ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              onClick={handleForgotPasswordUsername}
              disabled={!forgotPasswordUsername}
            >
              Enter
            </button>
          </form>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full cursor-pointer"
              onClick={() => {
                setIsUsernameValid(false); // Reset username validation state
                setForgotPasswordUsername(""); // Clear the username input
                setValidationError(""); // Clear any validation errors
                setIsForgotPassword(false); // Navigate back to login
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${home})` }}
      >
        <h1 className="text-7xl font-bold mb-16 text-white">
          Reset Your Password
        </h1>
        <form className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-blue-500">
            Enter New Password
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPasswordDetails.newPassword}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Retype New Password
            </label>
            <input
              type="password"
              name="retypeNewPassword"
              value={newPasswordDetails.retypeNewPassword}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Retype new password"
              onChange={handleNewPasswordChange}
            />
          </div>
          {validationError && (
            <p className="text-red-500 text-sm mb-4">{validationError}</p>
          )}
          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full cursor-pointer"
            onClick={handleSaveNewPassword}
          >
            Save
          </button>
        </form>
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full cursor-pointer"
            onClick={() => {
              setIsUsernameValid(false); // Reset username validation state
              setForgotPasswordUsername(""); // Clear the username input
              setValidationError(""); // Clear any validation errors
              setIsForgotPassword(false); // Navigate back to login
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${home})` }}
    >
      <h1 className="text-7xl font-bold mb-16 text-white">
        Welcome to Our Store!
      </h1>
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-500">
          Login to Your Account
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="userName"
            value={userDetails.userName}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={userDetails.password}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            onChange={changeHandler}
          />
          <div
            className="absolute inset-y-13.5 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full cursor-pointer"
        >
          Login
        </button>
      </form>
      <div className="mt-4 flex space-x-8">
        <button
          className="flex items-center bg-white text-blue-500 px-6 py-3 rounded hover:bg-gray-100 cursor-pointer border border-blue-500"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
        <button
          className="flex items-center bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 cursor-pointer"
          onClick={backHandler}
        >
          Back to Home
        </button>
      </div>
      <footer className="mt-50 text-white mb-0">
        <p className="text-4xl mb-8 text-white">
          Explore our products and enjoy shopping.
        </p>
      </footer>
    </div>
  );
};

export default Login;
