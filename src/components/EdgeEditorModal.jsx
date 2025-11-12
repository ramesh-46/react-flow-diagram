import React, { useEffect, useState } from 'react';
import { useDiagram } from '../context/DiagramContext';

const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(2,6,23,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 16,
};

const panel = {
  width: '100%',
  maxWidth: 520,
  background: '#fff',
  borderRadius: 10,
  padding: 18,
  boxShadow: '0 6px 30px rgba(2,6,23,0.18)',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const input = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: 12,
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  fontSize: 16, // Larger for mobile
};

const btn = {
  padding: '10px 16px',
  borderRadius: 6,
  border: 'none',
  background: '#0ea5e9',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
};

export default function EdgeEditorModal({ isOpen, initialEdge, onClose, onSave }) {
  const { nodes } = useDiagram();
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!initialEdge) {
      setSource('');
      setTarget('');
      setLabel('');
      return;
    }
    setSource(initialEdge.source || '');
    setTarget(initialEdge.target || '');
    setLabel(initialEdge.label || '');
  }, [initialEdge]);

  if (!isOpen) return null;

  function handleSave() {
    if (!source || !target) {
      alert('Select both source and target');
      return;
    }
    onSave({ source, target, label });
  }

  return (
    <div style={overlay}>
      <div style={panel}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>{initialEdge?.id ? 'Edit Edge' : 'Add Edge'}</h3>

        <label style={{ fontSize: 14, color: '#0f172a', display: 'block', marginBottom: 4 }}>
          Source Node
        </label>
        <select style={input} value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">-- select --</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.data?.label || n.id}
            </option>
          ))}
        </select>

        <label style={{ fontSize: 14, color: '#0f172a', display: 'block', marginBottom: 4 }}>
          Target Node
        </label>
        <select style={input} value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="">-- select --</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.data?.label || n.id}
            </option>
          ))}
        </select>

        <label style={{ fontSize: 14, color: '#0f172a', display: 'block', marginBottom: 4 }}>
          Label
        </label>
        <input style={input} value={label} onChange={(e) => setLabel(e.target.value)} />

        <div style={{ 
          display: 'flex', 
          gap: 12, 
          marginTop: 16, 
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }}>
          <button 
            style={{ 
              ...btn, 
              background: '#e2e8f0', 
              color: '#0f172a',
              flex: '1 1 auto',
              minWidth: 100,
            }} 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={{ 
              ...btn,
              flex: '1 1 auto',
              minWidth: 100,
            }} 
            onClick={handleSave}
          >
            Save Edge
          </button>
        </div>
      </div>
    </div>
  );
}