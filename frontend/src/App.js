import React from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './styles/custom_bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { AddJob } from './pages/Add-Job-Info';
import { Records } from './pages/Records';
import { Invoice } from './components/Invoice';
import { Navigation } from './components/Navigation';
import { Settings } from './pages/Settings';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-job-info" element={<AddJob />} />
        <Route path="/records" element={<Records />} />
        <Route path="/records/invoice_:id" element={<Invoice />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
