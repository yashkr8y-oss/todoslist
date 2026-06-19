import React, { useEffect, useState } from 'react'
import './TodoApp/TodoApp.css'

const API_BASE = import.meta.env.VITE_API_BASE || ''

const TodoApp = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getErrorMessage = (err, fallback) => {
        const message = err?.message || ''
        if (!API_BASE) {
            return 'Backend API base is not configured. Set VITE_API_BASE before building for GitHub Pages.'
        }
        if (message === 'Failed to fetch') {
            return `Unable to reach backend at ${API_BASE}. Start the FastAPI server or set the correct backend URL.`
        }
        return message || fallback
    }

    const fetchTodos = async () => {
        if (!API_BASE) {
            setError(getErrorMessage(null, 'Unable to load todos'))
            return
        }
        setLoading(true)
        setError('')
        try {
            const response = await fetch(`${API_BASE}/todos`)
            if (!response.ok) throw new Error('Failed to load todos')
            const data = await response.json()
            setTodos(data)
        } catch (err) {
            setError(getErrorMessage(err, 'Unable to load todos'))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const handleAddTodo = async (e) => {
        e.preventDefault()
        if (!input.trim()) return
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${API_BASE}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: input, completed: false }),
            })
            if (!response.ok) throw new Error('Failed to add todo')
            setInput('')
            await fetchTodos()
        } catch (err) {
            setError(err.message || 'Unable to add todo')
        } finally {
            setLoading(false)
        }
    }

    const toggleComplete = async (id, completed) => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !completed }),
            })
            if (!response.ok) throw new Error('Failed to update todo')
            await response.json()
            await fetchTodos()
        } catch (err) {
            setError(err.message || 'Unable to update todo')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete todo')
            await response.json()
            await fetchTodos()
        } catch (err) {
            setError(err.message || 'Unable to delete todo')
        } finally {
            setLoading(false)
        }
    }

    return(
        <div>
        <div className="todo-container">
            <h1>Todo lists</h1>
            <form action="#" onSubmit={handleAddTodo}>
                <input type="text" placeholder='Enter a Task' value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit' disabled={loading}>ADD</button>

            </form>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <ul className="todo-list">
                {todos.length === 0 && !loading && <li>No todos yet</li>}
               {
                todos.map((todo) =>( <li key={todo.id}>
                    <span onClick ={() => toggleComplete(todo.id, todo.completed)} className={todo.completed ? 'completed' : ''}>
                        {todo.text}
                    </span>
                    <button className="delete-button" onClick={() => handleDelete(todo.id)}>
                        Remove
                    </button>
                </li>))
               }
            </ul>
        </div>
        </div>
    )
}
export default TodoApp