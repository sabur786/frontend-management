import React, { useState } from 'react';
import { loginAPICall, saveLoggedInUser, storeToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const token = 'Basic ' + window.btoa(username + ":" + password);
      const response = await loginAPICall(username, password);

      // Save token
      storeToken(token); // or use response.data.token if JWT
      localStorage.setItem('token', token);

      // ✅ Save the logged-in user
      sessionStorage.setItem("authenticatedUser", username);

      // Clear error and navigate
      setErrorMessage('');
      //saveLoggedInUser(username); // Save username in sessionStorage
      console.log("Login successful, redirecting to todos...");
      navigate('/todos', { replace: true }); // Clean transition

    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="container">
      <br /><br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="text-center">Login Form</h3>
            </div>
            <div className="card-body">
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleLoginForm}>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username or Email</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username or email"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-success w-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;