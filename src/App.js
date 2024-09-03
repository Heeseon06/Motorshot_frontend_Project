import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import VideoAnalysisPage from './pages/VideoAnalysisPage';
import RecordDBPage from './pages/RecordDBPage';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* 보호된 경로 */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        <Route path="/analysis" element={
          <ProtectedRoute>
            <VideoAnalysisPage />
          </ProtectedRoute>
        } />

        <Route path="/record-db" element={
          <ProtectedRoute>
            <RecordDBPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
