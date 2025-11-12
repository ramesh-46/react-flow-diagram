import React from 'react';
import { Link } from 'react-router-dom';

const container = {
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const card = {
  border: '1px solid #e2e8f0',
  padding: 20,
  borderRadius: 8,
  background: '#ffffff',
  boxShadow: '0 2px 6px rgba(12,12,12,0.04)',
};

export default function HomePage() {
  return (
    <div style={{ 
      padding: '24px 16px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>React Flow Dynamic Diagram — Assignment</h1>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
          This sample app renders dynamic nodes & edges from metadata (JSON) and lets you add,
          edit and delete items via a sidebar and modal editors. Click Editor to begin.
        </p>

        <div style={card}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>Quick Start</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Go to <Link to="/editor">Editor</Link>.</li>
            <li>Click "Load sample metadata" to load the example JSON.</li>
            <li>Use the right sidebar to add/edit/delete nodes & edges. Drag nodes around.</li>
          </ol>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link 
            to="/editor" 
            style={{ 
              padding: '12px 24px', 
              background: '#0ea5e9', 
              color: '#fff', 
              borderRadius: 8, 
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              display: 'inline-block',
              minWidth: 200,
            }}
          >
            Open Editor
          </Link>
        </div>
      </div>
    </div>
  );
}