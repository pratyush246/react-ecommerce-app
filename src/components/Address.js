import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [preferredAddress, setPreferredAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    countryCode: "+91",
  });

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // Load addresses and preferred address from local storage on component mount
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const savedPreferredAddress = localStorage.getItem("preferredAddress");
    setAddresses(savedAddresses);
    setPreferredAddress(savedPreferredAddress || null);
  }, []);

  // Save addresses and preferred address to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
    if (preferredAddress) {
      localStorage.setItem("preferredAddress", preferredAddress);
    }
  }, [addresses, preferredAddress]);

  const handleAddAddress = () => {
    const { name, phone, street, city, state, zip, countryCode } = newAddress;
    if (!name || !phone || !street || !city || !state || !zip || !countryCode) {
      alert("All fields are required.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits only.");
      return;
    }
    if (!/^\d{6}$/.test(zip)) {
      alert("ZIP code must be 6 digits only.");
      return;
    }
    const formattedAddress = `${name}, ${countryCode} ${phone}, ${street}, ${city}, ${state}, ${zip}`;
    const updatedAddresses = [...addresses, formattedAddress];
    setAddresses(updatedAddresses);
    if (updatedAddresses.length === 1) {
      setPreferredAddress(formattedAddress); // Set the first address as preferred if it's the first one added
    } // Set the new address as preferred
    setNewAddress({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      countryCode: "+91",
    });
    setIsAddingAddress(false);
  };

  const handlePreferredChange = (address) => {
    setPreferredAddress(address);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-8 bg-white p-6 rounded shadow-md w-full md:w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Saved Addresses</h2>
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 border rounded shadow ${
                preferredAddress === address
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="preferredAddress"
                value={address}
                checked={preferredAddress === address}
                onChange={() => handlePreferredChange(address)}
                className="cursor-pointer"
              />
              <span className="text-gray-700">{address}</span>
            </div>
          ))}
          <div
            className="flex items-center space-x-4 p-4 border rounded shadow border-gray-300 cursor-pointer hover:bg-gray-100"
            onClick={() => setIsAddingAddress(true)}
          >
            <FaPlus className="text-blue-500" />
            <span className="text-blue-500">Add Address</span>
          </div>
        </div>
      ) : (
        <div className="text-gray-700">
          <p>No saved addresses found.</p>
          <button
            className="flex items-center text-blue-500 hover:text-blue-700 mt-4 cursor-pointer"
            onClick={() => setIsAddingAddress(true)}
          >
            <FaPlus className="mr-2" />
            Add Address
          </button>
        </div>
      )}

      {isAddingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-blue-500 cursor-pointer" onClick={() => setIsAddingAddress(false)}>
              Add New Address
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <div className="flex">
                  <select
                    name="countryCode"
                    className="p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="+91"
                    onChange={(e) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        countryCode: e.target.value,
                      }))
                    }
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+81">+81</option>
                  </select>
                  <input
                    type="text"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Street</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your street/flat/house address"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">State</label>
                <select
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={newAddress.zip}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your PIN code"
                />
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleAddAddress}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    setIsAddingAddress(false);
                    setNewAddress({
                      name: "",
                      phone: "",
                      street: "",
                      city: "",
                      state: "",
                      zip: "",
                      countryCode: "+91",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
