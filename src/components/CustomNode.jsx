import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ id, data }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 12,
      background: '#fff',
      position: 'relative',
    }}>
      <div>{data.label}</div>
      <div style={{ position: 'absolute', top: -10, right: -10, display: 'flex', gap: 4 }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onEdit(id);
          }}
          style={{
            background: '#f0f0f0',
            border: 'none',
            borderRadius: 4,
            padding: 4,
            cursor: 'pointer',
          }}
        >
          ✏️
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete(id);
          }}
          style={{
            background: '#f0f0f0',
            border: 'none',
            borderRadius: 4,
            padding: 4,
            cursor: 'pointer',
          }}
        >
          🗑️
        </button>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CustomNode;
