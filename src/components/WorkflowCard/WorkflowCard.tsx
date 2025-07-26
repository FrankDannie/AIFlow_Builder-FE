import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WorkflowCard.module.scss';

interface Props {
  id: number;
  title: string;
  description: string;
  lastEdited: string;
}

const WorkflowCard: React.FC<Props> = ({ id, title, description, lastEdited }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/workflow/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Last Edited: {lastEdited}</span>
    </div>
  );
};

export default WorkflowCard;
