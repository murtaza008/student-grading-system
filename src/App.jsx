import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router basename="/student-grading-system">
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <Header />
                <main className="main-content">
                  <HomePage />
                </main>
              </>
            </ProtectedRoute>
          } />
          <Route path="/section/:sectionId" element={
            <ProtectedRoute>
              <>
                <Header />
                <main className="main-content">
                  <SectionPage />
                </main>
              </>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
