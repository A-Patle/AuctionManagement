import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFranchiseDetails } from "../../slices/franchiseSlice";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [franchiseName, setFranchiseName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!franchiseName) newErrors.franchiseName = "Franchise Name is required";
    if (!ownerName) newErrors.ownerName = "Owner Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If valid, dispatch the action to update franchise details
      const formValues = {
        franchiseName,
        ownerName,
        email,
        phoneNumber: phone,
        franchiseLocation: location,
      };
      dispatch(updateFranchiseDetails(formValues));

      // Navigate to the Auction Success Page
      navigate("/auction-success");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="franchiseName">Franchise Name</label>
          <input
            type="text"
            id="franchiseName"
            value={franchiseName}
            onChange={(e) => setFranchiseName(e.target.value)}
          />
          {errors.franchiseName && (
            <span className="error">{errors.franchiseName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ownerName">Owner Name</label>
          <input
            type="text"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          {errors.ownerName && (
            <span className="error">{errors.ownerName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Franchise Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <button type="submit" className="button-green">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
