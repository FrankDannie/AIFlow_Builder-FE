import React from "react";
import styles from "./RecentRunsTable.module.scss";

const mockRuns = [
  { id: 1, name: "Chat Workflow", status: "Success", tokensUsed: 1234 },
  { id: 2, name: "QA Bot", status: "Failure", tokensUsed: 456 },
];

const RecentRunsTable: React.FC = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Workflow</th>
          <th>Status</th>
          <th>Tokens Used</th>
        </tr>
      </thead>
      <tbody>
        {mockRuns.map((run) => (
          <tr key={run.id}>
            <td>{run.name}</td>
            <td className={styles[run.status.toLowerCase()]}>{run.status}</td>
            <td>{run.tokensUsed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentRunsTable;
