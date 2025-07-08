import axios from 'axios';

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/auth';

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register' , registerObj);

export const loginAPICall = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', { usernameOrEmail, password });

export const storeToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => !!getLoggedInUser();

// export const isUserLoggedIn = () => {
//     return !!getLoggedInUser(); // Returns true if user is logged in, false otherwise
// };



export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
     return username ? username : null; // Return null if no user is logged in
};


export const logout = () => {
    // Clear the token from localStorage
    sessionStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.clear();

};

