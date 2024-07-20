import Header from './Components/Header/Header';
import HomePage from './Interfaces/HomePage/HomePage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./Interfaces/Register/Login"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;