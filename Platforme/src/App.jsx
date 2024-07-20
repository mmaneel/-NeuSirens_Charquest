import Header from './Components/Header/Header';
import HomePage from './Interfaces/HomePage/HomePage'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
  
    <Router>
    <Routes>
      <Route path="/" element={<Header />} />
      
    </Routes>
  </Router>
  

  )
}

export default App
