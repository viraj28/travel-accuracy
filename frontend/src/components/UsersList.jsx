import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import { deleteUser } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';

const UsersList = () => {
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
        const res2 = await axios.get('/users/all', config);

        const usersData = res2.data;

        console.log(usersData);

        setUsers(usersData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm(`Sure to delete?`)) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      let usersAfterDelete = users.filter((usr) => usr._id !== id);

      setUsers(usersAfterDelete);

      await deleteUser(id, config);
    } else {
      console.log('no dlete');
    }
  };

  return (
    <>
      <div className="col-10 offset-1">
        <div className="row">
          <h5 className="col-sm-6">Users list</h5>
          <div className="col-sm-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search..."
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {' '}
                  <button className="btn">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped my-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Company</th>
              <th scope="col">Email</th>
              <th scope="col">Role </th>
              <th scope="col">Created At </th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, ind) => {
              return (
                <>
                  <tr key={usr._id + 0}>
                    <th key={usr._id + 'a'} scope="row">
                      {ind + 1}
                    </th>
                    <td key={usr._id + 1}>{usr.name}</td>
                    <td key={usr._id + 2}>{usr.companyName}</td>
                    <td key={usr._id + 3}>{usr.email}</td>
                    <td
                      key={usr._id + 6}
                      className={usr.role === 'admin' ? 'backgroundGreen' : ''}
                    >
                      {usr.role}
                    </td>
                    <td key={usr._id + 5}>
                      {new Date(usr.createdAt).toDateString()}
                    </td>

                    <td key={usr._id + 7}>
                      <button
                        key={usr._id + 8}
                        className="btn btn-danger"
                        onClick={() => handleDelete(usr._id)}
                        name={usr._id}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
