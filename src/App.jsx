import React, { useState } from "react";
import "./App.css";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  country: "",
  terms: false,
};

function App() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!form.country) {
      newErrors.country = "Please select a country.";
    }

    if (!form.terms) {
      newErrors.terms = "You must accept the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const dataToShow = { ...form };
    delete dataToShow.password;
    delete dataToShow.confirmPassword;

    setSubmittedData(dataToShow);
    setForm(initialFormState);
  };

  return (
    <div className="app">
      <div className="form-card">
        <h1>Registration Form</h1>
        <p className="subtitle">
          Fill in the form below to create your account.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-type your password"
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+123456789"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="row">
            <div className="field">
              <span className="label">Gender</span>
              <div className="inline-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={form.gender === "other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="field">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                <option value="">Select your country</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="nigeria">Nigeria</option>
                <option value="india">India</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
                <option value="other">Other</option>
              </select>
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </div>
          </div>

          <div className="field checkbox-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              I agree to the terms and conditions.
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>

        {submittedData && (
          <div className="success-box">
            <h2>Registration Successful!</h2>
            <p>Your details:</p>
            <ul>
              <li>
                <strong>Name:</strong> {submittedData.firstName}{" "}
                {submittedData.lastName}
              </li>
              <li>
                <strong>Email:</strong> {submittedData.email}
              </li>
              <li>
                <strong>Phone:</strong> {submittedData.phone}
              </li>
              <li>
                <strong>Gender:</strong> {submittedData.gender}
              </li>
              <li>
                <strong>Country:</strong> {submittedData.country}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


