import React, { useState } from 'react';
import { useDiagram } from '../context/DiagramContext';
import NodeEditorModal from './NodeEditorModal';
import EdgeEditorModal from './EdgeEditorModal';

const sidebarWrap = {
  width: '100%',
  maxWidth: 360,
  borderLeft: '1px solid #e6eef4',
  padding: 16,
  background: '#f8fafc',
  boxSizing: 'border-box',
  overflowY: 'auto',
  height: '100%',
};

const groupBox = {
  background: '#fff',
  border: '1px solid #e6eef4',
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  boxShadow: '0 1px 4px rgba(2,6,23,0.04)',
};

const btnPrimary = {
  padding: '10px 12px',
  borderRadius: 6,
  border: 'none',
  background: '#0ea5e9',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 16,
  flex: 1,
};

const smallBtn = {
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  background: '#fff',
  cursor: 'pointer',
  marginRight: 8,
  fontSize: 14,
  whiteSpace: 'nowrap',
};

export default function Sidebar() {
  const {
    nodes,
    edges,
    addNode,
    updateNode,
    removeNode,
    addEdge,
    updateEdge,
    removeEdge,
    loadSample,
  } = useDiagram();

  const [nodeModalOpen, setNodeModalOpen] = useState(false);
  const [edgeModalOpen, setEdgeModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [editingEdge, setEditingEdge] = useState(null);

  function handleAddNode() {
    const n = addNode({ position: { x: 60, y: 60 }, label: 'New Node' });
    setEditingNode(n);
    setNodeModalOpen(true);
  }

  function handleEditNode(node) {
    setEditingNode(node);
    setNodeModalOpen(true);
  }

  function handleDeleteNode(node) {
    if (!window.confirm(`Delete node "${node.data?.label}"? This will also remove connecting edges.`)) return;
    removeNode(node.id);
  }

  function handleAddEdge() {
    setEditingEdge({ source: '', target: '', label: '' });
    setEdgeModalOpen(true);
  }

  function handleEditEdge(edge) {
    setEditingEdge(edge);
    setEdgeModalOpen(true);
  }

  function handleDeleteEdge(edge) {
    if (!window.confirm(`Delete edge "${edge.id}"?`)) return;
    removeEdge(edge.id);
  }

  return (
    <aside style={sidebarWrap}>
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        marginBottom: 16,
        flexWrap: 'wrap',
      }}>
        <button 
          style={{ 
            ...btnPrimary,
            minWidth: 180,
          }} 
          onClick={() => loadSample()}
        >
          Load sample metadata
        </button>
        <button style={{ ...smallBtn, flex: 1, minWidth: 90 }} onClick={handleAddNode}>
          + Node
        </button>
        <button style={{ ...smallBtn, flex: 1, minWidth: 90 }} onClick={handleAddEdge}>
          + Edge
        </button>
      </div>

      <div style={groupBox}>
        <h4 style={{ marginTop: 0, fontSize: '1.125rem' }}>Nodes ({nodes.length})</h4>
        {nodes.length === 0 ? (
          <div style={{ color: '#6b7280' }}>No nodes yet. Add one or load sample metadata.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {nodes.map((n) => (
              <div key={n.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                gap: 12,
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, wordBreak: 'break-word' }}>{n.data?.label || 'Unnamed'}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>id: {n.id}</div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: 8, 
                  flexShrink: 0,
                  marginTop: 'auto'
                }}>
                  <button 
                    style={{ ...smallBtn, marginRight: 0 }} 
                    onClick={() => handleEditNode(n)}
                  >
                    Edit
                  </button>
                  <button 
                    style={smallBtn} 
                    onClick={() => handleDeleteNode(n)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={groupBox}>
        <h4 style={{ marginTop: 0, fontSize: '1.125rem' }}>Edges ({edges.length})</h4>
        {edges.length === 0 ? (
          <div style={{ color: '#6b7280' }}>No edges yet. Connect nodes on canvas or add here.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {edges.map((e) => (
              <div key={e.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                gap: 12,
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, wordBreak: 'break-word' }}>{e.label || `${e.source} → ${e.target}`}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{e.id}</div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: 8, 
                  flexShrink: 0,
                  marginTop: 'auto'
                }}>
                  <button 
                    style={{ ...smallBtn, marginRight: 0 }} 
                    onClick={() => handleEditEdge(e)}
                  >
                    Edit
                  </button>
                  <button 
                    style={smallBtn} 
                    onClick={() => handleDeleteEdge(e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: 16, 
        fontSize: 14, 
        color: '#475569',
        lineHeight: 1.4,
      }}>
        Tip: drag nodes to reposition them; connecting on canvas will create edges. 
        Use Editor sidebar to fine-tune metadata.
      </div>

      <NodeEditorModal
        isOpen={nodeModalOpen}
        initialNode={editingNode}
        onClose={() => {
          setEditingNode(null);
          setNodeModalOpen(false);
        }}
        onSave={(nodePatch) => {
          if (editingNode?.id) {
            updateNode(editingNode.id, { data: { ...editingNode.data, ...nodePatch } });
          } else {
            addNode({ position: nodePatch.position, label: nodePatch.label, meta: nodePatch.meta });
          }
          setNodeModalOpen(false);
          setEditingNode(null);
        }}
      />

      <EdgeEditorModal
        isOpen={edgeModalOpen}
        initialEdge={editingEdge}
        onClose={() => {
          setEditingEdge(null);
          setEdgeModalOpen(false);
        }}
        onSave={(edgePatch) => {
          if (editingEdge?.id) {
            updateEdge(editingEdge.id, edgePatch);
          } else {
            if (!edgePatch.source || !edgePatch.target) {
              alert('Edge requires a source and target node id.');
              return;
            }
            addEdge({ source: edgePatch.source, target: edgePatch.target, label: edgePatch.label });
          }
          setEdgeModalOpen(false);
          setEditingEdge(null);
        }}
      />
    </aside>
  );
}