import type { Workflow } from "../types/workflow"

const API_BASE = import.meta.env.VITE_API_BASE

export async function getWorkflows(): Promise<Workflow[]> {
    const res = await fetch(API_BASE + '/workflows')
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
