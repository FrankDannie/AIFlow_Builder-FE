import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

interface Props {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search workflows..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
