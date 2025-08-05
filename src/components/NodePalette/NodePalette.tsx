import React from 'react';

const nodeTypes = [
  { type: 'input', label: '🟢 Input' },
  { type: 'retriever', label: '🔍 Retriever' },
  { type: 'summarizer', label: '📄 Summarizer' },
  { type: 'llm', label: '🧠 LLM Agent' },
  { type: 'email_gen', label: '✍️ Email Generator' },
  { type: 'email_send', label: '📧 Email Sender' },
  { type: 'tool_call', label: '🔧 Tool Caller' },
  { type: 'search', label: '🌐 Web Search' },
  { type: 'file_ops', label: '📁 File Operator' },
  { type: 'output', label: '🔵 Output' },
];

interface Props {
  onDragStart: (e: React.DragEvent, nodeType: string) => void;
}

export const NodePalette: React.FC<Props> = ({ onDragStart }) => {
  return (
    <aside style={{ width: 200, padding: 10, backgroundColor: '#f4f4f4' }}>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          style={{
            padding: '8px',
            margin: '5px 0',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'grab',
            backgroundColor: '#fff',
          }}
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default NodePalette;
