import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge as rfAddEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDiagram } from '../context/DiagramContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CustomNode = ({ id, data, selected }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 12,
      background: '#fff',
      position: 'relative',
      minWidth: 120,
      fontSize: '0.9rem',
    }}>
      <div>{data.label}</div>
      {selected && (
        <div style={{
          position: 'absolute',
          top: -10,
          right: -10,
          display: 'flex',
          gap: 4,
          zIndex: 2,
        }}>
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
              fontSize: '0.75rem',
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
              fontSize: '0.75rem',
            }}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function DiagramCanvas() {
  const {
    nodes: providerNodes,
    edges: providerEdges,
    setAllNodes,
    setAllEdges,
    loadSample,
    addEdge: addEdgeContext,
    deleteNode: deleteNodeContext,
    editNode: editNodeContext,
  } = useDiagram();

  const [nodes, setNodes, onNodesChange] = useNodesState(providerNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(providerEdges);
  const { fitView } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  useEffect(() => {
    setNodes(providerNodes);
  }, [providerNodes, setNodes]);

  useEffect(() => {
    setEdges(providerEdges);
  }, [providerEdges, setEdges]);

  const onNodesChangeSync = useCallback(
    (changes) => {
      onNodesChange(changes);
      setAllNodes(nodes);
    },
    [onNodesChange, setAllNodes, nodes]
  );

  const onEdgesChangeSync = useCallback(
    (changes) => {
      onEdgesChange(changes);
      setAllEdges(edges);
    },
    [onEdgesChange, setAllEdges, edges]
  );

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `e-${params.source}-${params.target}-${Date.now()}`,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => rfAddEdge(newEdge, eds));
      addEdgeContext({ source: params.source, target: params.target, label: '' });
    },
    [setEdges, addEdgeContext]
  );

  const onEdgeDoubleClick = useCallback((evt, edge) => {
    console.log('edge dbl click', edge);
  }, []);

  const handleDeleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    deleteNodeContext(id);
    setSelectedNodeId(null);
  }, [setNodes, deleteNodeContext]);

  const handleEditNode = useCallback((id) => {
    const nodeToEdit = nodes.find((node) => node.id === id);
    const newLabel = prompt('Edit node label:', nodeToEdit.data.label);
    if (newLabel !== null) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
      editNodeContext(id, newLabel);
    }
  }, [nodes, setNodes, editNodeContext]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  // PDF Download Function (Diagram)
  const downloadDiagramAsPDF = async () => {
    const flowElement = document.querySelector('.react-flow__container');
    if (!flowElement) return;

    const canvas = await html2canvas(flowElement, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('diagram.pdf');
  };

  // JSON Download Function (Node Data)
  const downloadNodeDataAsJSON = () => {
    const data = {
      nodes,
      edges,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'node-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      flex: 1,
      position: 'relative',
      minHeight: 0,
    }}>
      <div style={{
        position: 'absolute',
        zIndex: 10,
        left: 12,
        top: 12,
        display: 'flex',
        gap: 8,
        background: 'rgba(255,255,255,0.95)',
        padding: '8px 10px',
        borderRadius: 8,
        boxShadow: '0 1px 6px rgba(2,6,23,0.08)',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: 'calc(100% - 24px)',
      }}>
        <button
          style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
          }}
          onClick={() => loadSample()}
        >
          Load sample
        </button>
        <button
          style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
          }}
          onClick={() => fitView({ padding: 0.12 })}
        >
          Fit view
        </button>
        <button
          style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
          }}
          onClick={downloadDiagramAsPDF}
        >
          Download Diagram as PDF
        </button>
        <button
          style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
          }}
          onClick={downloadNodeDataAsJSON}
        >
          Download Node Data as JSON
        </button>
        <div style={{
          marginLeft: 8,
          color: '#111827',
          fontSize: '0.875rem',
          flex: 1,
          minWidth: 150,
        }}>
          Drag nodes to reposition. Connect nodes to create edges.
        </div>
      </div>
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            onEdit: handleEditNode,
            onDelete: handleDeleteNode,
          },
          selected: node.id === selectedNodeId,
        }))}
        edges={edges}
        onNodesChange={onNodesChangeSync}
        onEdgesChange={onEdgesChangeSync}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeClick={onNodeClick}
        fitView
        style={{ width: '100%', height: '100%' }}
        nodeTypes={nodeTypes}
      >
        <MiniMap nodeColor={(n) => '#60a5fa'} />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
