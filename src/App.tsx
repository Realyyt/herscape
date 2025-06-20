import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#eaffd0', minHeight: '100vh' }}>
      <h1>HERSCAPE - React App is Working!</h1>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/community" element={<div>Community Page</div>} />
        <Route path="/events" element={<div>Events Page</div>} />
        <Route path="/join" element={<div>Join Page</div>} />
        <Route path="/success" element={<div>Success Page</div>} />
      </Routes>
    </div>
  );
}