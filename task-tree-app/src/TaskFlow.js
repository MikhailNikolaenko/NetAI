import React, { useState } from 'react';
import ReactFlow, { Handle, Position, Background, applyNodeChanges } from 'react-flow-renderer';

const nodeTypes = {
    custom: ({ data }) => (
        <div style={{ padding: 10, border: '1px solid black' }}>
            <Handle type="target" position={Position.Top} />
            {data.label}
            <Handle type="source" position={Position.Bottom} />
        </div>
    ),
};

function TaskFlow() {
    const [nodes, setNodes] = useState([
        { id: '1', type: 'custom', data: { label: 'Root Task' }, position: { x: 250, y: 5 } }
    ]);
    const [edges, setEdges] = useState([]);

    const addNode = () => {
        const newNode = {
            id: `${nodes.length + 1}`,
            type: 'custom',
            data: { label: `Task ${nodes.length + 1}` },
            position: { x: Math.random() * 500, y: Math.random() * 500 }
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const onConnect = (params) => {
        setEdges((eds) => [...eds, params]);
    };

    const onNodesChange = (changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    };

    // This function handles right-clicking on an edge to remove it
    const onEdgeContextMenu = (event, edge) => {
        event.preventDefault(); // Prevent default context menu
        setEdges((eds) => eds.filter((e) => e.id !== edge.id)); // Remove the selected edge
    };

    return (
        <div
            style={{ height: '80vh', width: '100%' }}
            onContextMenu={(e) => e.preventDefault()}  // Disable context menu for the entire flow area
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                onEdgeContextMenu={onEdgeContextMenu}  // Handle right-click to remove edges
                style={{ width: '100%', height: '100%' }}
            >
                <Background />
            </ReactFlow>
            <button onClick={addNode}>Add Task</button>
        </div>
    );
}

export default TaskFlow;
