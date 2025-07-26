import React from 'react';
import styles from './EditorToolbar.module.scss';
import type { Workflow } from '../../types/workflow';

type Props = {
  workflow: Workflow;
};

const EditorToolbar: React.FC<Props> = ({ workflow }) => {
  return (
    <div className={styles.toolbar}>
      <h2>{workflow.title}</h2>
      <div className={styles.buttonGroup}>
        <button>💾 Save</button>
        <button>▶️ Run</button>
        <button>📦 Export</button>
        <button>🕘 History</button>
      </div>
    </div>
  );
};


export default EditorToolbar;
