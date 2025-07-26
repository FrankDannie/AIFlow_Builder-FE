import React, { useState, useEffect } from 'react';
import styles from './NodeEditor.module.scss';
import type { Node } from '../../types/workflow';

type Props = {
  selectedNode: Node | null;
  onChange: (node: Node) => void;
  onSave: (node: Node) => Promise<void>;
};

const NodeEditor: React.FC<Props> = ({ selectedNode, onChange, onSave }) => {
  const [form, setForm] = useState<Node | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setForm(selectedNode);
    setHasChanges(false);
  }, [selectedNode]);

  if (!form) {
    return <div className={styles.nodeEditor}><p>Select a node to edit</p></div>;
  }

  const handleInputChange = (field: keyof Node, value: string) => {
    if (!form) return;
    const updated = { ...form, [field]: value };
    setForm(updated);
    setHasChanges(true);
    onChange(updated);
  };

  const handleSave = () => {
    if (form) {
      onSave(form);
      setHasChanges(false);
    }
  };

  return (
    <div className={styles.nodeEditor}>
      <h3>Edit Node</h3>

      <div className={styles.fieldGroup}>
        <label htmlFor="nodeName">Name</label>
        <input
          id="nodeName"
          type="text"
          value={form.name}
          onChange={e => handleInputChange('name', e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="nodePrompt">Prompt</label>
        <textarea
          id="nodePrompt"
          rows={4}
          value={form.prompt}
          onChange={e => handleInputChange('prompt', e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="nodeModel">Model</label>
        <select
          id="nodeModel"
          value={form.model}
          onChange={e => handleInputChange('model', e.target.value)}
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="custom">Custom</option>
          {/* Add more models if needed */}
        </select>
      </div>

      <button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={!hasChanges}
      >
        Save
      </button>
    </div>
  );
};

export default NodeEditor;
