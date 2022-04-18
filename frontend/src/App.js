import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { useState, useEffect } from 'react';


function AppRouter() {
  const [seats, setSeats] = useState([])

  useEffect(() => {
    fetch('http://localhost:8089/kino1/seats/all')
      .then((resp) => resp.json())
      .then(bookedArray => {
        setSeats(bookedArray)
      })
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home seats={seats} setSeats={setSeats} />} />
        <Route path='/dashboard' element={<Dashboard seats={seats} setSeats={setSeats} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
