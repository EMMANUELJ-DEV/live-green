import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import PublishPage from './PublishPage';
import PostPage from './PostPage';
import DonationPage from './DonationPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/publish" element={<PublishPage />} />
            <Route path="/post/:author/:permlink" element={<PostPage />} />
            <Route path="/donate" element={<DonationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;