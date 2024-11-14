import React from 'react';
import { BezierEdge } from 'react-flow-renderer';

function CustomEdge(props) {
    const { id, sourceX, sourceY, targetX, targetY, markerEnd } = props;

    // Right-click handler to remove the edge
    const handleContextMenu = (event) => {
        event.preventDefault(); // Prevent default right-click behavior
        console.log(`Right-clicked on edge with ID: ${id}`); // Debug log
        props.onEdgeRemove(id);  // Call the remove function with edge ID
    };

    return (
        <g onContextMenu={handleContextMenu}>
            <BezierEdge
                id={id}
                sourceX={sourceX}
                sourceY={sourceY}
                targetX={targetX}
                targetY={targetY}
                markerEnd={markerEnd}
                style={{ stroke: '#222', strokeWidth: 2 }}
            />
        </g>
    );
}

export default CustomEdge;
