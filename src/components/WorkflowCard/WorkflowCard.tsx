import React from "react";
import styles from "./WorkflowCard.module.scss";

interface Props {
  title: string;
  description: string;
  lastEdited: string;
}

const WorkflowCard: React.FC<Props> = ({ title, description, lastEdited }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <small>Last edited: {lastEdited}</small>
    </div>
  );
};

export default WorkflowCard;
