export interface Workflow {
    nodes: Node[]
    id: number
    title: string
    description?: string
    last_edited: string
    edges?: Edge[];
  }

// src/types/workflow.ts
export interface Node {
  id: string;
  name: string;
  prompt: string;
  model: string;
  type: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
  // Add any other fields your backend requires
}