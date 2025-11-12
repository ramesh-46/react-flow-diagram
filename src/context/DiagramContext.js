import React, { createContext, useContext, useState, useCallback } from 'react';
import sampleMetadata from '../data/sampleMetadata.json';
import { v4 as uuidv4 } from 'uuid';

/**
 * DiagramContext provides:
 * - nodes & edges (arrays)
 * - functions to load metadata, add/edit/delete nodes/edges, set nodes/edges
 *
 * We'll keep nodes/edges in the provider; react-flow will manage internal positions,
 * but we persist changes here when nodes change.
 */

const DiagramContext = createContext(null);

export function DiagramProvider({ children }) {
  // nodes and edges shaped to React Flow's expectations.
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Load metadata JSON
  const loadMetadata = useCallback((metadata) => {
    if (!metadata) return;
    // Ensure IDs
    const nodesMapped = (metadata.nodes || []).map((n) => {
      return {
        id: String(n.id || uuidv4()),
        type: n.type || 'default',
        position: n.position || { x: 200, y: 100 },
        data: n.data || { label: n.label || 'Node' },
      };
    });

    const edgesMapped = (metadata.edges || []).map((e, idx) => {
      return {
        id: e.id || `e-${e.source}-${e.target}-${idx}`,
        source: String(e.source),
        target: String(e.target),
        label: e.label || '',
      };
    });

    setNodes(nodesMapped);
    setEdges(edgesMapped);
  }, []);

  // Load sample metadata convenience
  const loadSample = useCallback(() => {
    loadMetadata(sampleMetadata);
  }, [loadMetadata]);

  // Node operations
  const addNode = useCallback(({ position = { x: 100, y: 100 }, label = 'New Node', meta = {} } = {}) => {
    const id = uuidv4();
    const newNode = {
      id,
      type: 'default',
      position,
      data: { label, meta },
    };
    setNodes((n) => [...n, newNode]);
    return newNode;
  }, []);

  const updateNode = useCallback((id, patch) => {
    setNodes((n) => n.map((node) => (node.id === id ? { ...node, ...patch, data: { ...node.data, ...(patch.data || {}) } } : node)));
  }, []);

  const removeNode = useCallback((id) => {
    setNodes((n) => n.filter((node) => node.id !== id));
    setEdges((es) => es.filter((e) => e.source !== id && e.target !== id));
  }, []);

  // Edge operations
  const addEdge = useCallback(({ source, target, label = '' }) => {
    const id = `e-${source}-${target}-${uuidv4().slice(0, 6)}`;
    const newEdge = { id, source, target, label };
    setEdges((es) => [...es, newEdge]);
    return newEdge;
  }, []);

  const updateEdge = useCallback((id, patch) => {
    setEdges((es) => es.map((edge) => (edge.id === id ? { ...edge, ...patch } : edge)));
  }, []);

  const removeEdge = useCallback((id) => {
    setEdges((es) => es.filter((e) => e.id !== id));
  }, []);

  // For syncing positions when nodes move in React Flow
  const setAllNodes = useCallback((newNodes) => {
    setNodes(newNodes);
  }, []);

  const setAllEdges = useCallback((newEdges) => {
    setEdges(newEdges);
  }, []);

  return (
    <DiagramContext.Provider
      value={{
        nodes,
        edges,
        loadMetadata,
        loadSample,
        addNode,
        updateNode,
        removeNode,
        addEdge,
        updateEdge,
        removeEdge,
        setAllNodes,
        setAllEdges,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
}

export function useDiagram() {
  const ctx = useContext(DiagramContext);
  if (!ctx) throw new Error('useDiagram must be used inside DiagramProvider');
  return ctx;
}
