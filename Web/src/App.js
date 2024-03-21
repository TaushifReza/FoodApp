import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
        <Routes>
           <Route path="/login" element={<LoginScreen />} />
           <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
