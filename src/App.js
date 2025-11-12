import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './routes/HomePage';
import EditorPage from './routes/EditorPage';
import { DiagramProvider } from './context/DiagramContext';

const appStyle = {
  fontFamily: 'Inter, Roboto, sans-serif',
  height: '100vh',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
};

const navStyle = {
  display: 'flex',
  gap: 12,
  padding: '10px 16px',
  background: '#0f172a',
  color: '#fff',
  alignItems: 'center',
};

const linkStyle = {
  color: '#e2e8f0',
  textDecoration: 'none',
  fontWeight: 600,
  padding: '8px 12px',
  borderRadius: 6,
};

const App = () => {
  return (
    <div style={appStyle}>
      <nav style={navStyle}>
        <div style={{ fontWeight: 700 }}>React Flow Diagram</div>
        <div style={{ marginLeft: 16 }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/editor" style={{ ...linkStyle, marginLeft: 8 }}>
            Editor
          </Link>
        </div>
      </nav>

      <DiagramProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </DiagramProvider>
    </div>
  );
};

export default App;
