import React, { useEffect, useState } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputBase, Paper } from "@mui/material";
import { set } from "date-fns";

const SearchField = ({searchQuery, setSearchQuery}) =>{
  const [searchValue, setSearchValue] = useState("");

  useEffect(()=>{
    setSearchQuery(searchQuery);
  },[searchQuery])

  function searchHandler(event) {
    event.preventDefault();
    setSearchQuery(searchValue);
    console.log(searchValue);
    return;
  }
  return (
    <div style ={styles}>
    <div className={styles.searchcontainer}>
      <div className={styles.searchdiv}>
      <div
        className={styles.searching}
        // component="form"
        onSubmit={searchHandler}
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
          onClick={() => setSearchQuery("")}
          disabled={searchQuery === ""}
        >
          
          {searchQuery && <CloseIcon />}
        </IconButton>
        <IconButton
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={searchHandler}
        >
          <SearchIcon />
        </IconButton>
      </div>
      </div>
    </div>
    </div>
  );
}

export default SearchField;