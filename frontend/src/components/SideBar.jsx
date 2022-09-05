import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = ({ isAdmin }) => {
  return (
    <>
      <div className="sidebar">
        <NavLink className="active" to="/dashboard">
          Packages
        </NavLink>
        {isAdmin ? (
          <>
            <NavLink className="" to=" ">
              Inquiries
            </NavLink>
            <NavLink className="" to=" ">
              Users
            </NavLink>
          </>
        ) : null}
      </div>
    </>
  );
};

export default SideBar;
