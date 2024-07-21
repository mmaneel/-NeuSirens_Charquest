import Header from './Components/Header/Header';
import HomePage from './Interfaces/HomePage/HomePage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./Interfaces/Register/Login"
import ChatWithChild from './Interfaces/ChatWithChild/ChatWithChild';
import Listen from './Interfaces/Listeningskills/Listen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatWithChild/>} />
        <Route path="/Listening" element={<Listen/>}/>
      </Routes>
    </Router>
  );
}

export default App;