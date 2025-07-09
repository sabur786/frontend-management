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
    const response = await loginAPICall(username, password);

    // ✅ Make sure response.data.accessToken exists
    const token = 'Bearer ' + response.data.accessToken;

    // ✅ get Role from response
    const role = response.data.role; // Default to USER if not provided

    // ✅ Store token
    storeToken(token); // optional helper
    saveLoggedInUser(username, role);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);

    // ✅ Save user info to sessionStorage
    sessionStorage.setItem("authenticatedUser", username);

    // ✅ Clear error and navigate
    setErrorMessage('');
    navigate('/todos', { replace: true });

  } catch (error) {
    console.error("Login error:", error);
    setErrorMessage("Login failed. Please check your username and password.");
  }
};

   return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'> Login Form </h2>
                    </div>

                    <div className='card-body'>
                        <form>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Username or Email</label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='username'
                                        className='form-control'
                                        placeholder='Enter username'
                                        value={username}
                                        onChange={ (e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Password </label>
                                <div className='col-md-9'>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={ (e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <button className='btn btn-primary' onClick={ (e) => handleLoginForm(e)}>Submit</button>

                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>


    </div>
  )
}


export default LoginComponent