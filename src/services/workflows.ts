import type { Workflow, Node } from "../types/workflow"

const API_BASE = import.meta.env.VITE_API_BASE

export async function getWorkflows(): Promise<Workflow[]> {
    const res = await fetch(`${API_BASE}/workflows`)
    if (!res.ok) throw new Error('Failed to fetch workflows')
    return await res.json()
  }
  
  export async function createWorkflow(data: {
    title: string
    description?: string
  }): Promise<Workflow> {
    const res = await fetch(API_BASE + '/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create workflow')
    return await res.json()
  }

  export const getWorkflowById = async (id: string): Promise<Workflow> => {
    const res = await fetch(`${API_BASE}/workflows/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch workflow');
    }
    return await res.json();
  };

  export async function updateNodeInWorkflow(workflowId: number, updatedNode: Node): Promise<Workflow> {
    // Example fetch call to update node
    const response = await fetch(`/api/workflows/${workflowId}/nodes/${updatedNode.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNode),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update node');
    }
  
    const updatedWorkflow = await response.json();
    return updatedWorkflow;
  }