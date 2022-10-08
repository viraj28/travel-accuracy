import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import Card from '../components/Card';
import InquiriesList from '../components/InquiriesList';
import PackageGrid from '../components/PackageGrid';
import PackageList from '../components/PackageList';

import SideBar from '../components/SideBar';
import UsersList from '../components/UsersList';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPackages, setShowPackages] = useState(true);
  const [showInquiries, setShowInquiries] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const handlePackagesClick = () => {
    setShowPackages(true);
    setShowInquiries(false);
    setShowUsers(false);
  };
  const handleInquiriesClick = () => {
    setShowPackages(false);
    setShowInquiries(true);
    setShowUsers(false);
  };
  const handleUsersClick = () => {
    setShowPackages(false);
    setShowInquiries(false);
    setShowUsers(true);
  };
  const { user } = useContext(AuthContext);

  const getUserRole = () => {
    user.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
  };

  useEffect(() => {
    getUserRole();
  });

  //   console.log(isAdmin);
  return (
    <>
      <section className="section my-3 " id="dashboard">
        <div className="container">
          <div className="flex">
            <SideBar
              isAdmin={isAdmin}
              showPackages={showPackages}
              showInquiries={showInquiries}
              showUsers={showUsers}
              handlePackagesClick={handlePackagesClick}
              handleInquiriesClick={handleInquiriesClick}
              handleUsersClick={handleUsersClick}
            />
            <div className="content ">
              <div className="row">
                {/* Packages visible to agents in a grid */}
                {!isAdmin && (
                  <>
                    <PackageGrid />
                  </>
                )}
                {/* Packages visible to admins in a list*/}
                {isAdmin && showPackages && <PackageList />}
                {isAdmin && showInquiries && <InquiriesList />}
                {isAdmin && showUsers && <UsersList />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
