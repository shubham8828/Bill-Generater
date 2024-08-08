// src/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file for styling
import { Link,useNavigate } from 'react-router-dom';
import axiox from 'axios'
import toast from 'react-hot-toast'
import bcrypt from 'bcryptjs'


function LoginForm() {
  
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
     formData.password= await bcrypt.hash(formData.password, 10);
    
    await axiox.get('http://localhost:8000/api/login',formData)
    .then(()=>{
      toast.success('Login Successfull',{position:"top-center"})
        navigate("/")
    })
    .catch((error) => {
        console.log(error);
    });

    // Optionally, clear the fields after submission
    
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            name='email'
            value={formData.email}

            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name='password'
            value={formData.password}

            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="register-text">
        Don’t have an account? <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;
