import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Routes>

      <Route path='/' element={<Landing isAuth={isAuth} setIsAuth={setIsAuth} />} />
      <Route path="/home" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;
