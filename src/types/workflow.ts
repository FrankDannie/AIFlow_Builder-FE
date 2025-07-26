export interface Workflow {
    nodes: any
    id: number
    title: string
    description?: string
    last_edited: string
  }

// src/types/workflow.ts
export type Node = {
  id: string;
  name: string;
  type: string; // this must be present
  prompt: string;
  model: string;
  // add any other fields here
};

