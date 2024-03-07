import React, { useEffect, useState } from 'react'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const Navigate = useNavigate();
    const [apires, setapires] = useState("NO Response");
const [login, setLogin] = useState({
    email: '',
    password: '',
});

// const apiFetch = () => {
//     fetch("http://localhost:8000/", {
//         method: 'GET',
//     })
//     .then(res => {
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     })
//     .then(res => {
//         setapires(res.message);
//     })
//     .catch(error => {
//         console.error('Error:', error);
       
//     });
// }

const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(login)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        toast.success('Login Successful');
        setTimeout(() => {
            Navigate('/home');
        }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
       
    });
}

// useEffect(() => {
//     apiFetch();
// }, []);

    return (
        <div className='login_div'>
            <ToastContainer />
            <div class="form-container">
                <p class="title">Login</p>
                <form class="form">
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input onChange={(e) => { setLogin({ ...login, email: e.target.value }) }} type="email" name="email" id="username" placeholder="" />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input onChange={(e) => { setLogin({ ...login, password: e.target.value }) }} type="password" name="password" id="password" placeholder="" />
                        <div class="forgot">
                            {/* <a rel="noopener noreferrer" href="#">Forgot Password ?</a> */}
                        </div>
                    </div>
                    <button onClick={handleLogin} class="sign">Login</button>
                </form>
                {/* <div class="social-message">
                    <div class="line"></div>
                    <p class="message">Login with social accounts</p>
                    <div class="line"></div>
                </div> */}
                {/* <div class="social-icons">
                    <button aria-label="Log in with Google" class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>

                </div> */}
                <div class="signup">Don't have an account?
                    <button onClick={() => Navigate('/signup')}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Login