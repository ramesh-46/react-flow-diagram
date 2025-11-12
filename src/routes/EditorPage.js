import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import DiagramCanvas from '../components/DiagramCanvas';
import Sidebar from '../components/Sidebar';

const editorWrapper = {
  display: 'flex',
  height: 'calc(100vh - 64px)', // nav height accounted
  width: '100%',
};

export default function EditorPage() {
  return (
    <div style={editorWrapper}>
      <ReactFlowProvider>
        <DiagramCanvas />
      </ReactFlowProvider>
      <Sidebar />
    </div>
  );
}
