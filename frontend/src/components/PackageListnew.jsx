import axios from 'axios';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchPackages() {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const res = await axios.get('/packages', config);
        const res2 = await axios.get('/users/all', config);
        const data = res.data;
        const usersData = res2.data;
        setPackages(data);
        setUsers(usersData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, []);

  return (
    <div>
      {packages.map((pack) => (
        <div key={pack._id}>
          <div>{pack.title}</div>
          <div>{users.find((o) => o._id === pack.user).name}</div>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
