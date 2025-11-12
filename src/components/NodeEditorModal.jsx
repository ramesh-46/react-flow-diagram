import React, { useEffect, useState } from 'react';

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
  fontSize: 16,
};

const textarea = {
  width: '100%',
  padding: '10px 12px',
  minHeight: 120,
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  fontSize: 16,
  resize: 'vertical',
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

export default function NodeEditorModal({ isOpen, initialNode, onClose, onSave }) {
  const [label, setLabel] = useState('');
  const [meta, setMeta] = useState('{}');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');

  useEffect(() => {
    if (!initialNode) {
      setLabel('');
      setMeta('{}');
      setPosX('');
      setPosY('');
      return;
    }
    setLabel(initialNode.data?.label || '');
    setMeta(JSON.stringify(initialNode.data?.meta || {}, null, 2));
    setPosX(initialNode.position?.x ?? '');
    setPosY(initialNode.position?.y ?? '');
  }, [initialNode]);

  if (!isOpen) return null;

  function handleSave() {
    let parsedMeta = {};
    try {
      parsedMeta = JSON.parse(meta || '{}');
    } catch (e) {
      alert('Meta must be valid JSON');
      return;
    }

    const final = {
      label,
      meta: parsedMeta,
      position: {
        x: Number(posX) || 0,
        y: Number(posY) || 0,
      },
    };
    onSave({
      label,
      meta: parsedMeta,
      position: final.position,
    });
  }

  return (
    <div style={overlay}>
      <div style={panel}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>{initialNode ? 'Edit Node' : 'Add Node'}</h3>

        <label style={{ fontSize: 14, color: '#0f172a', display: 'block', marginBottom: 4 }}>
          Label
        </label>
        <input style={input} value={label} onChange={(e) => setLabel(e.target.value)} />

        <label style={{ fontSize: 14, color: '#0f172a', display: 'block', marginBottom: 4 }}>
          Position (x, y)
        </label>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <input 
            placeholder="x" 
            style={{ ...input, marginBottom: 0, flex: 1 }} 
            value={posX} 
            onChange={(e) => setPosX(e.target.value)} 
          />
          <input 
            placeholder="y" 
            style={{ ...input, marginBottom: 0, flex: 1 }} 
            value={posY} 
            onChange={(e) => setPosY(e.target.value)} 
          />
        </div>

        <label style={{ fontSize: 14, color: '#0f172a', display: 'block', marginBottom: 4 }}>
          Meta (JSON)
        </label>
        <textarea style={textarea} value={meta} onChange={(e) => setMeta(e.target.value)} />

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
            Save Node
          </button>
        </div>
      </div>
    </div>
  );
}