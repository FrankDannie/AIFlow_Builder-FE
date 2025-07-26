import React from 'react';
import type { Workflow } from '../../types/workflow';

type Props = {
  workflow: Workflow;
  onSelectNode?: (nodeId: string) => void; // <-- add this
};

const WorkflowCanvas: React.FC<Props> = ({ workflow, onSelectNode }) => {
  // Example handler when a node is clicked:
  const handleNodeClick = (nodeId: string) => {
    if (onSelectNode) {
      onSelectNode(nodeId);
    }
  };

  // Render nodes, attach onClick for example:
  return (
    <div>
      {workflow?.nodes?.map((node: any) => (
        <div
          key={node.id}
          onClick={() => handleNodeClick(node.id)}
          style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px', cursor: 'pointer' }}
        >
          {node.name}
        </div>
      ))}
    </div>
  );
};

export default WorkflowCanvas;
