import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
  type Node as FlowNode,
  type Edge as FlowEdge,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from 'react-flow-renderer';

import type { Node as WorkflowNode, Edge as WorkflowEdge } from '../../types/workflow';

interface Props {
  workflowId: number;
  onSelectNode: (nodeId: string) => void;
  onGraphChange: (nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
}

export const WorkflowCanvas: React.FC<Props> = ({ workflowId, onSelectNode, onGraphChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge[]>([]);

  const sendUpdateToBackend = async (nodes: FlowNode[], edges: FlowEdge[]) => {
    try {
      const workflowNodes = convertToWorkflowNodes(nodes);
      const workflowEdges = convertToWorkflowEdges(edges);
      await fetch(`/api/workflows/${workflowId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: workflowNodes, edges: workflowEdges }),
      });
    } catch (error) {
      console.error('Failed to update workflow', error);
    }
  };

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updated = applyNodeChanges(changes, nodes);
      setNodes(updated);
      sendUpdateToBackend(updated, edges);
    },
    [nodes, edges]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updated = applyEdgeChanges(changes, edges);
      setEdges(updated);
      sendUpdateToBackend(nodes, updated);
    },
    [nodes, edges]
  );

  const onConnect = useCallback(
    (params: FlowEdge | Connection) => {
      const updatedEdges = addEdge(params, edges);
      setEdges(updatedEdges);
      sendUpdateToBackend(nodes, updatedEdges);
    },
    [nodes, edges]
  );

  const onNodeClick = (_: any, node: FlowNode) => {
    onSelectNode(node.id);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode: FlowNode = {
      id: `${type}_${+new Date()}`,
      type: 'default',
      position,
      data: {
        label: type,
        type: type,
        name: '',
        prompt: '',
        model: 'gpt-3.5-turbo',
      },
    };

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    sendUpdateToBackend(updatedNodes, edges);
    onSelectNode(newNode.id);
  };

  const convertToWorkflowNodes = (flowNodes: FlowNode[]): WorkflowNode[] => {
    return flowNodes.map((n) => ({
      id: n.id,
      type: n.data?.type || 'default',
      name: n.data?.name || '',
      prompt: n.data?.prompt || '',
      model: n.data?.model || '',
    }));
  };

  const convertToWorkflowEdges = (flowEdges: FlowEdge[]): WorkflowEdge[] => {
    return flowEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
    }));
  };

  useEffect(() => {
    const convertedNodes = convertToWorkflowNodes(nodes);
    const convertedEdges = convertToWorkflowEdges(edges);
    onGraphChange(convertedNodes, convertedEdges);
  }, [nodes, edges]);

  return (
    <div style={{ flex: 1, height: '100%' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      />
    </div>
  );
};
