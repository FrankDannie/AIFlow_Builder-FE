import React from "react";
import styles from "./CreateNewButton.module.scss";
import { useNavigate } from "react-router-dom";

const CreateNewButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate("/workflow-editor")}>
      + Create New Workflow
    </button>
  );
};

export default CreateNewButton;
