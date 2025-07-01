import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';

export const getAllTodos = () => axios.get(BASE_REST_API_URL);

export const getTodoById = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);

export const saveTodo = (todo) => axios.post(BASE_REST_API_URL, todo);

export const updateTodo = (id, todo) => axios.put(`${BASE_REST_API_URL}/${id}`, todo);

export const deleteTodo = (id) => axios.delete(`${BASE_REST_API_URL}/${id}`);

export const completeTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/complete`);

export const inCompleteTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/in-complete`);