import { auth, provider } from './Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import Animation from "./assests/Animation - 1708731203880.json"
import { FcGoogle } from "react-icons/fc";
import './App.css'
function Landing({ isAuth, setIsAuth }) {
    const Navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            console.log("User ID:", user.uid);
            setIsAuth(true)
            console.log(result);
            Navigate('/home')
        })
    }

    const goMainPage = () => {
        {
            isAuth ? Navigate('/home') : toast.warning("Please Sign Up With Google ");
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className="headersection">
                <h1 clas>TODOAPP</h1>
                {
                    isAuth ? <></> : <div className="google_div" onClick={signInWithGoogle}>
                        <FcGoogle size={32} />
                    </div>
                }

            </div>
            <div className="container_second">

                <div className="container_second_one" >

                    <p className='p1tags'>Capturing Tasks, Unleashing Productivity: Where Every Todo Finds a Home. Your Tasks, Your Todos, Your Space.</p>
                    <p className="p2tags">Organize Your Life, One Task at a Time</p>

                    <button onClick={goMainPage} className="custom-btn btn-6"><span>Create Todo</span></button>

                </div>
                <div className="animation_contianer">
                    <Lottie animationData={Animation} loop={true} />
                </div>
            </div>
        </div >

    );
}

export default Landing;