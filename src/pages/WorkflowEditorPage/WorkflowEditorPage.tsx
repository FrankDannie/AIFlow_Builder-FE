import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './WorkflowEditorPage.module.scss';
import type { Workflow, Node as WorkflowNode, Edge as WorkflowEdge } from '../../types/workflow';
import {
  getWorkflowById,
  updateNodeInWorkflow,
  updateWorkflowGraph,
} from '../../services/workflows';

import EditorToolbar from '../../components/EditorToolbar/EditorToolbar';
import ExecutionLogs from '../../components/ExecutionLogs/ExecutionLogs';
import NodeEditor from '../../components/NodeEditor/NodeEditor';
import NodePalette from '../../components/NodePalette/NodePalette';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ReactFlowProvider } from 'react-flow-renderer';
import { WorkflowCanvas } from '../../components/WorkflowCanvas/WorkflowCanvas';

const WorkflowEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  useEffect(() => {
    if (id) {
      getWorkflowById(id)
        .then(setWorkflow)
        .catch(err => console.error('Failed to load workflow:', err));
    }
  }, [id]);

  const handleSelectNode = (nodeId: string) => {
    const node =
      workflow?.nodes.find((n: { id: string }) => n.id === nodeId) ??
      { id: nodeId, name: '', prompt: '', model: '', type: 'default' }; // fallback
  
    setSelectedNode(node);
  };
  

  const handleNodeChange = (node: WorkflowNode) => {
    if (!workflow) return;
    const updatedNodes = workflow.nodes.map((n: any) => (n.id === node.id ? node : n));
    setWorkflow({ ...workflow, nodes: updatedNodes });
    setSelectedNode(node);
  };

  const handleNodeSave = async (node: WorkflowNode) => {
    if (!workflow) return;
    try {
      await updateNodeInWorkflow(workflow.id, node);
      handleNodeChange(node);
      alert('Node saved successfully!');
    } catch (err) {
      console.error('Failed to save node:', err);
      alert('Failed to save node.');
    }
  };

  const handleGraphChange = useCallback(
    async (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
      if (!workflow) return;
  
      try {
        await updateWorkflowGraph(workflow.id, { nodes, edges });
        setWorkflow(prev => prev ? { ...prev, nodes, edges } : prev);
      } catch (error) {
        console.error('Failed to update workflow graph:', error);
      }
    },
    [workflow]
  );
  

  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  if (!workflow) return <div>Loading...</div>;

  return (
    <div className={styles.editorPage}>
      <Sidebar />
      <EditorToolbar workflow={workflow} />
      <div className={styles.mainArea}>
        <NodePalette onDragStart={handleDragStart} />
        <div className={styles.canvasWrapper}>
          <ReactFlowProvider>
            <WorkflowCanvas
              workflowId={workflow.id}
              onSelectNode={handleSelectNode}
              onGraphChange={handleGraphChange}
            />
          </ReactFlowProvider>
        </div>
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
