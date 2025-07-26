import React from "react";
import styles from "./DashboardPage.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateNewButton from "../../components/CreateNewButton/CreateNewButton";
import RecentRunsTable from "../../components/RecentRunsTable/RecentRunsTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import WorkflowCard from "../../components/WorkflowCard/WorkflowCard";

const DashboardPage: React.FC = () => {
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
            {/* map over saved workflows */}
            <WorkflowCard
              title="Chat Summarizer"
              description="Summarizes long conversations"
              lastEdited="2024-07-24"
            />
            {/* Repeat WorkflowCards */}
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
