import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = ({
  isAdmin,
  showPackages,
  showInquiries,
  showUsers,
  handlePackagesClick,
  handleInquiriesClick,
  handleUsersClick,
}) => {
  // console.log(showPackages, showInquiries, showUsers);
  return (
    <>
      <div className="sidebar">
        <NavLink
          className={showPackages ? 'active' : ''}
          to=" "
          onClick={handlePackagesClick}
        >
          Packages
        </NavLink>
        {isAdmin ? (
          <>
            <NavLink
              className={showInquiries ? 'active' : ''}
              onClick={handleInquiriesClick}
              to=" "
            >
              Inquiries
            </NavLink>
            <NavLink
              className={showUsers ? 'active' : ''}
              onClick={handleUsersClick}
              to=" "
            >
              Users
            </NavLink>
          </>
        ) : null}
      </div>
    </>
  );
};

export default SideBar;
