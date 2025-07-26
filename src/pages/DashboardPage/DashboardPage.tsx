import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateNewButton from "../../components/CreateNewButton/CreateNewButton";
import RecentRunsTable from "../../components/RecentRunsTable/RecentRunsTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import WorkflowCard from "../../components/WorkflowCard/WorkflowCard";
import { getWorkflows } from "../../services/workflows";
import type { Workflow } from "../../types/workflow";

const DashboardPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    getWorkflows()
      .then(setWorkflows)
      .catch((err) => console.error("Error fetching workflows:", err));
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <CreateNewButton />
        </header>

        <SearchBar />

        <section className={styles.workflowSection}>
          <h2>Saved Workflows</h2>
          <div className={styles.workflowGrid}>
  {workflows.map((wf) => (
    <WorkflowCard
      key={wf.id}
      id={wf.id}
      title={wf.title}
      description={wf.description || ''}
      lastEdited={wf.last_edited || 'N/A'}
    />
  ))}
</div>
        </section>

        <section className={styles.recentRuns}>
          <h2>Recent Runs</h2>
          <RecentRunsTable />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
