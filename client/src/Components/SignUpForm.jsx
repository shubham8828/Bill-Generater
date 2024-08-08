import React, { useState } from 'react';
import './SignUpForm.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axiox from 'axios'
import toast from 'react-hot-toast'

function SignUpForm() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    await axiox.post('http://localhost:8000/api/signup',formData)
    .then(()=>{
      toast.success('Registration Successfull',{position:"top-right"})
        navigate("/")
    })
    .catch((error) => {
        console.log(error);
    });
    // Optionally, clear the form fields after submission
    setFormData({
      company: '',
      email: '',
      phone: '',
      password: '',
      address: ''
    });
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="company"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNo">Contact No.:</label>
          <input
            type="text"
            id="contactNo"
            name="phone"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>

        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-text">
        Already have an account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}

export default SignUpForm;
