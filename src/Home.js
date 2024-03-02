// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBell } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    const api_url = "http://localhost:8000/todoRoutes"
    const [todos, setTodos] = useState([]);

    const [newTodo, setnewTodo] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        fetchApi();
    }, [])

    const fetchApi = async () => {
        try {
            const response = await fetch(`${api_url}/getalltodos`)
            const data = await response.json();
            console.log(data);
            setTodos(data.todos);
        } catch (error) {
            console.log(error);

        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${api_url}/deletetodo/${id}`, {
                method: "DELETE"
            })
            const data = await response.json();
            toast.success(data.message)

            fetchApi();
        } catch (error) {

        }
    }

    const updateTodo = async (id, update) => {
        try {
            const response = await fetch(`${api_url}/updatetodo/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update),
            });
            if (response.ok) {
                const updating = todos.map((todo) =>
                    todo.id === id ? update : todo
                );
                setTodos(updating);
                fetchApi();
            }
            else {
                console.error('Failed to update Todo');
            }

        } catch (error) {
            console.error('error ', error);
        }
    }


    const makeTodo = async (e) => {
        if (newTodo.title === "") {
            toast.warning("Title is required")
        }
        e.preventDefault();
        try {
            const response = await fetch(`${api_url}/createtodo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            })
            const data = await response.json();
            // alert(data.message);  // coming from the backend
            fetchApi();
        } catch (error) {

        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='head'>
                <div>
                    <h1 className='heading'>HII SUNNY</h1>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <FontAwesomeIcon icon={faBell} className='fa-solid fa-bell fa-bounce fa-2xl' />
                    <h1 className='heading'>TODO APP</h1>
                </div>
            </div>
            <div className='main'>


                <div className='todo--div'>
                    <form className='form'>
                        <input type='text' placeholder='Title'
                            onChange={(e) => setnewTodo({
                                ...newTodo,
                                title: e.target.value
                            })}
                        />
                        <br></br>
                        <input type='text' placeholder='Description'
                            onChange={(e) => setnewTodo({
                                ...newTodo,
                                description: e.target.value
                            })}
                        />
                        <br></br>
                        <button onClick={makeTodo} className='btn'>Create Todo</button>
                    </form>
                </div>

                <div className='card-div'>
                    {
                        todos.map((todo) => {

                            return (

                                <div className='card' key={todo._id}>
                                    {
                                        todo.completed ?
                                            <>
                                                <h4 style={{
                                                    textDecoration: 'line-through'
                                                }}>{todo.title}
                                                </h4>
                                                <p style={{
                                                    textDecoration: 'line-through'
                                                }}>{todo.description}
                                                </p>

                                            </>
                                            : <>
                                                <h4>{todo.title}</h4>
                                                <p>{todo.description}</p>
                                            </>
                                    }


                                    <div className='btns-div'>
                                        <FontAwesomeIcon onClick={() => updateTodo(todo._id, { ...todos, completed: !todo.completed })} icon={faCheck} className='fa-xl' />
                                        <button onClick={() => deleteTodo(todo._id)} className='btn1'>Delete</button>
                                    </div>

                                </div>


                            )
                        })
                    }
                </div>

            </div>
        </div>

    );
}

export default Home;




