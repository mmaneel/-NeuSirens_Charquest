import HomePage from './Interfaces/HomePage/HomePage'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <h1 style={{color:"black"}}>hello</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>

  )
}

export default App
