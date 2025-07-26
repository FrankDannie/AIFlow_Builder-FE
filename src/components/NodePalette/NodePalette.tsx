import React from 'react';
import styles from './NodePalette.module.scss';

const NodePalette: React.FC = () => {
  return (
    <div className={styles.palette}>
      <h3>Agent Library</h3>
      <ul>
        <li>📄 Summarizer</li>
        <li>🔍 Retriever</li>
        <li>✍️ Email Generator</li>
        <li>📧 Email Sender</li>
        <li>🧠 Custom GPT Agent</li>
      </ul>
    </div>
  );
};

export default NodePalette;
