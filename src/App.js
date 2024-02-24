import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Routes>

      <Route path='/' element={<Landing isAuth={isAuth} setIsAuth={setIsAuth} />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
