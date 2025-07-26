import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./WorkflowEditorPage.module.scss";
import type { Workflow, Node } from '../../types/workflow';
import { getWorkflowById, updateNodeInWorkflow } from '../../services/workflows';

import EditorToolbar from '../../components/EditorToolbar/EditorToolbar';
import ExecutionLogs from '../../components/ExecutionLogs/ExecutionLogs';
import NodeEditor from '../../components/NodeEditor/NodeEditor';
import NodePalette from '../../components/NodePalette/NodePalette';
import WorkflowCanvas from '../../components/WorkflowCanvas/WorkflowCanvas';
import Sidebar from '../../components/Sidebar/Sidebar';

const WorkflowEditorPage: React.FC = () => {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Fetch workflow by ID
  useEffect(() => {
    if (id) {
      getWorkflowById(id)
        .then(setWorkflow)
        .catch(err => console.error('Failed to load workflow:', err));
    }
  }, [id]);

  if (!workflow) return <div>Loading...</div>;

  // Called when a node is selected in the canvas
  const handleSelectNode = (nodeId: string) => {
    const node = workflow.nodes.find((n: { id: string; }) => n.id === nodeId) || null;
    setSelectedNode(node);
  };

  // Called when fields in NodeEditor are updated
  const handleNodeChange = (node: Node) => {
    if (!workflow) return;
    const updatedNodes = workflow.nodes.map((n: { id: string; }) =>
      n.id === node.id ? node : n
    );
    setWorkflow({ ...workflow, nodes: updatedNodes });
    setSelectedNode(node);
  };
  
  const handleNodeSave = async (node: Node) => {
    try {
      if (!workflow) return;
      await updateNodeInWorkflow(workflow.id, node);
      handleNodeChange(node);
      alert('Node saved successfully!');
    } catch (err) {
      console.error('Failed to save node:', err);
      alert('Failed to save node.');
    }
  };

  return (
    <div className={styles.editorPage}>
      <Sidebar />
      <EditorToolbar workflow={workflow} />
      <div className={styles.mainArea}>
        <NodePalette />
        <WorkflowCanvas workflow={workflow} onSelectNode={handleSelectNode} />
        <NodeEditor
          selectedNode={selectedNode}
          onChange={handleNodeChange}
          onSave={handleNodeSave}
        />
      </div>
      <ExecutionLogs workflowId={workflow.id} />
    </div>
  );
};

export default WorkflowEditorPage;
