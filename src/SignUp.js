import React, { useEffect, useState } from 'react'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const Navigate = useNavigate();
    const [apires, setapires] = useState("NO Response");
    const [register, setRegister] = useState(
        {
            name: '',
            email: '',
            password: '',
        }
    );
    const apiFetch = () => {
        fetch("http://localhost:8000/", {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => {
                setapires(res.message);
            })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(register)
        })
            .then(res => res.json())
            .then(data => {

                toast('Sign Up Successfull')
                setTimeout(() => {

                    Navigate('/login')
                }, 2000)
            })
            .catch((console.error()))


    }
    useEffect(() => {
        apiFetch();
    }, [])
    return (
        <div className='login_div'>
            <ToastContainer />
            <div class="form-container">
                <p class="title">SignUp</p>
                <form class="form">
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input onChange={(e) => { setRegister({ ...register, name: e.target.value }) }} type="text" name="username" id="username" placeholder="" />
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input onChange={(e) => { setRegister({ ...register, email: e.target.value }) }} type="email" name="email" id="username" placeholder="" />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input onChange={(e) => { setRegister({ ...register, password: e.target.value }) }} type="password" name="password" id="password" placeholder="" />
                        <div class="forgot">
                            {/* <a rel="noopener noreferrer" href="#">Forgot Password ?</a> */}
                        </div>
                    </div>
                    <button onClick={handleSubmit} class="sign">Sign up</button>
                </form>


                <div class="signup">Already have an account?
                    <button onClick={() => Navigate('/login')}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Signup