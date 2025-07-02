import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/images/home.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });

  const [userNameExists, setUserNameExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{6,12}$/;
    return passwordRegex.test(password);
  };

  const validateUserName = (userName) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,8}$/;
    return usernameRegex.test(userName);
  };

  useEffect(() => {
    if (!userDetails.userName) {
      setUserNameExists(false);
      return;
    }
    let debounceTimeout;
    debounceTimeout = setTimeout(() => {
      const storedUserDetails =
        JSON.parse(localStorage.getItem("userDetailsList")) || [];
      const userExists = storedUserDetails.some(
        (user) => user.userName === userDetails.userName
      );
      setUserNameExists(userExists);
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [userDetails.userName]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const backHandler = () => {
    setShowPassword(false);
    setUserNameExists(false);
    setUserDetails({ userName: "", password: "" });
    navigate("/");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value.trim(),
    }));

    if (name === "userName") {
      if (!validateUserName(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          userName:
            "Username must be 3-8 characters long and can contain letters, numbers, and underscores.",
        }));
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          userName: "",
        }));
      }
    }

    if (name === "password") {
      if (!validatePassword(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must be 6-12 characters long and include letters, numbers, and special characters.",
        }));
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.userName || !userDetails.password) {
      alert("Please fill in all fields.");
      return;
    }
    if (validationErrors.userName || validationErrors.password) {
      alert("Please fix the validation errors before submitting.");
      return;
    }
    const storedUserDetails =
      JSON.parse(localStorage.getItem("userDetailsList")) || [];
    const newDetails = [...storedUserDetails, userDetails];
    localStorage.setItem("userDetailsList", JSON.stringify(newDetails));

    setShowPassword(false);
    setUserNameExists(false);
    setUserDetails({ userName: "", password: "" });
    navigate("/login");
    alert("Sign up successful! You can now log in.");
  };

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
          Sign Up for a New Account
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
          {userNameExists && (
            <p className="text-red-500 text-sm mt-2">
              Username already exists. Please choose a different username.
            </p>
          )}
          {validationErrors.userName && (
            <p className="text-red-500 text-sm mt-2">
              {validationErrors.userName}
            </p>
          )}
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
            className="absolute inset-y-13.5 right-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </div>
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-2">
              {validationErrors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`px-6 py-2 rounded w-full cursor-pointer ${
            userNameExists ||
            validationErrors.userName ||
            validationErrors.password
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={
            userNameExists ||
            validationErrors.userName ||
            validationErrors.password
          }
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full cursor-pointer"
          onClick={backHandler}
        >
          Back to Home
        </button>
      </div>
      <div className="mt-8 bg-white p-4 rounded shadow-md w-96">
        <h3 className="text-lg font-bold text-blue-500 mb-2">
          Username Criteria:
        </h3>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          <li>Must be 3-8 characters long.</li>
          <li>Can contain letters, numbers, and underscores.</li>
        </ul>
        <h3 className="text-lg font-bold text-blue-500 mt-4 mb-2">
          Password Criteria:
        </h3>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          <li>Must be 6-12 characters long.</li>
          <li>Must include letters, numbers, and special characters.</li>
        </ul>
      </div>
      <footer className="mt-50 text-white mb-0">
        <p className="text-4xl mb-8 text-white">
          Explore our products and enjoy shopping.
        </p>
      </footer>
    </div>
  );
};

export default SignUp;
