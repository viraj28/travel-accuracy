import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import { deleteInquiry } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';

const InquiriesList = () => {
  const [inquiries, setInquiries] = useState([]);
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
        const res3 = await axios.get('/inquire/all', config);
        const res = await axios.get('/packages', config);
        const res2 = await axios.get('/users/all', config);
        const data = res.data;
        const usersData = res2.data;
        const inquireData = res3.data;
        console.log(data);
        setInquiries(inquireData.data);
        setPackages(data);
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

      let inquiriesAfterDelete = inquiries.filter((inq) => inq._id !== id);

      setInquiries(inquiriesAfterDelete);

      await deleteInquiry(id, config);
    } else {
      console.log('no dlete');
    }
  };

  const getPackageTitle = (id) => {
    let pack = packages.find((o) => o._id === id);
    if (pack !== undefined) {
      return pack.title;
    } else return '[Deleted]';
  };

  return (
    <>
      <div className="col-10 offset-1">
        <div className="row">
          <h5 className="col-sm-6">Inquiries list</h5>
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
              <th scope="col">Inquiry</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone </th>
              <th scope="col">Package </th>
              <th scope="col">Date </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq, ind) => {
              return (
                <>
                  <tr key={inq._id + 0}>
                    <th key={inq._id + 'a'} scope="row">
                      {ind + 1}
                    </th>
                    <td key={inq._id + 1}>{inq.text}</td>
                    <td key={inq._id + 2}>
                      {users.find((o) => o._id === inq.user).name}
                    </td>
                    <td key={inq._id + 3}>
                      {users.find((o) => o._id === inq.user).email}
                    </td>
                    <td key={inq._id + 6}>{inq.phone}</td>
                    <td key={inq._id + 5}>{getPackageTitle(inq.package)}</td>
                    <td key={inq._id + 4}>
                      {new Date(inq.createdAt).toDateString()}
                    </td>

                    <td key={inq._id + 7}>
                      <button
                        key={inq._id + 8}
                        className="btn btn-danger"
                        onClick={() => handleDelete(inq._id)}
                        name={inq._id}
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

export default InquiriesList;
