import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <nav className={styles.sidebar}>
      <h2 className={styles.logo}>Aiflow Builder</h2>
      <ul className={styles.navList}>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/templates">Templates</NavLink></li>
        <li><NavLink to="/billing">Billing</NavLink></li>
        <li><NavLink to="/team">Team</NavLink></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
