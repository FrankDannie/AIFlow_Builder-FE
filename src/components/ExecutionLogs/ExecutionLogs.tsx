import React from 'react';
import styles from './ExecutionLogs.module.scss';

type Props = {
  workflowId: number;
};

const ExecutionLogs: React.FC<Props> = ({ workflowId }) => {
  return (
    <div className={styles.logs}>
      <h4>Execution Logs</h4>
      <p>Connected to logs for workflow: {workflowId}</p>
    </div>
  );
};

export default ExecutionLogs;
