import "./navbar.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { FaSearch } from "react-icons/fa";

function Navbar(props) {
  // function tempFunc(e){
  //   console.log(e.target.value);
  //   props.handleChange(e.target.value);
  // }
  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      <div className="container">
        <div className="brand-logo-wrapper">
          <Link to="/" className="brand-logo" onClick={props.handleFeatured}>
            TheMovieDB
          </Link>
        </div>

        <Menu
          transition
          menuButton={
            <MenuButton>
              <FaSearch />
            </MenuButton>
          }
        >
          <MenuItem
            onClick={(e) => {
              // Stop the `onItemClick` of root menu component from firing
              e.stopPropagation = true;
              // Keep the menu open after this menu item is clicked
              e.keepOpen = true;
            }}
          >
            <form
              onSubmit={(event) => {
                navigate("/");
                props.handleSubmit(event);
              }}
            >
              <div className="input-field">
                <input
                  type="search"
                  placeholder="Search movie"
                  onChange={props.handleChange}
                  value={props.searchTerm}
                  id="searchInput"
                />
              </div>
            </form>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
