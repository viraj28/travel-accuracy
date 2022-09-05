import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import Card from '../components/Card';
import PackageList from '../components/PackageList';

import SideBar from '../components/SideBar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [packages, setPackages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);
  const fetchPackages = async (user) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    user.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
    try {
      const res = await axios.get('/packages', config);
      setPackages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackages(user);
  }, [user]);

  //   console.log(isAdmin);
  return (
    <>
      <section className="section my-3 " id="dashboard">
        <div className="container">
          <div className="flex">
            <SideBar isAdmin={isAdmin} />
            <div className="content ">
              <div className="row">
                {/* Packages visible to agents in a grid */}
                {!isAdmin &&
                  packages.map((val, ind) => {
                    return (
                      <Card
                        key={ind}
                        imgsrc={
                          'http://localhost:5000' +
                            val.packageImages[0].substring(7) ||
                          val.packageImage
                        }
                        title={val.title}
                        desc={val.description}
                      />
                    );
                  })}
                {/* Packages visible to agents in a grid*/}
                {isAdmin && <PackageList packages={packages} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
