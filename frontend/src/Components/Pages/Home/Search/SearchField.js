import React, { useState } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputBase, Paper } from "@mui/material";

const SearchField = ({searchQuery, setSearchQuery}) =>{
  const [searchValue, setSearchValue] = useState("");
  function searchHandler(event) {
    event.preventDefault();
    console.log(searchValue);
  }
  return (
    <div style ={styles}>
    <div className={styles.searchcontainer}>
      <div className={styles.searchdiv}>
      <Paper
        className={styles.searching}
        component="form"
        >
       {/* sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 600 }} */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => setSearchValue("")}
          disabled={searchValue === ""}
        >
          {searchValue && <CloseIcon />}
        </IconButton>
        <IconButton
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={searchHandler}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      </div>
    </div>
    </div>
  );
}

export default SearchField;