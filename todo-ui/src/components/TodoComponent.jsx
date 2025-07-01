import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById, saveTodo, updateTodo } from '../services/TodoService';

const TodoComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getTodoById(id)
                .then((response) => {
                    const todo = response.data;
                    setTitle(todo.title);
                    setDescription(todo.description);
                    setCompleted(todo.completed);
                })
                .catch(error => {
                    console.error("Error fetching todo:", error);
                });
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const newErrors = {};
        
        if (!title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        }
        
        if (!description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        }
        
        setErrors(newErrors);
        return valid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const todo = { title, description, completed };
            
            if (id) {
                updateTodo(id, todo)
                    .then(() => {
                        navigate('/todos');
                    })
                    .catch(error => {
                        console.error("Error updating todo:", error);
                    });
            } else {
                saveTodo(todo)
                    .then(() => {
                        navigate('/todos');
                    })
                    .catch(error => {
                        console.error("Error saving todo:", error);
                    });
            }
        }
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>
                        {id ? 'Update Todo' : 'Add Todo'}
                    </h2>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Title:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    placeholder='Enter Todo Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {errors.title && 
                                    <div className='invalid-feedback'>{errors.title}</div>
                                }
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Description:</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder='Enter Todo Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && 
                                    <div className='invalid-feedback'>{errors.description}</div>
                                }
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Completed:</label>
                                <select
                                    className='form-control'
                                    value={completed}
                                    onChange={(e) => setCompleted(e.target.value === 'true')}
                                >
                                    <option value='false'>No</option>
                                    <option value='true'>Yes</option>
                                </select>
                            </div>
                            <button type='submit' className='btn btn-success'>
                                {id ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoComponent;