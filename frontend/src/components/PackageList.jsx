import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { deletePackage } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import Pagination from './Pagination';

const PackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const [input, setInput] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchPackages() {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        setLoading(true);
        const res = await axios.get('/api/packages', config);
        const res2 = await axios.get('/api/users/all', config);
        const data = res.data;
        const usersData = res2.data;
        setPackages(data);
        setUsers(usersData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, [user]);
  const handleAdd = () => {
    navigate('/package/add');
  };

  const handleEdit = (id) => {
    navigate(`/package/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Sure to delete?`)) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      let packagesAfterDelete = packages.filter((pack) => pack._id !== id);

      setPackages(packagesAfterDelete);

      await deletePackage(id, config);
    } else {
      console.log('no dlete');
    }
  };

  //Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPackages = packages.slice(indexOfFirstPost, indexOfLastPost);
  if (isSearching) {
    currentPackages = packages.filter((pack) => {
      if (pack.title.toLowerCase().includes(input.toLowerCase())) {
        return pack;
      }
      return null;
    });
  }
  const search = () => {
    if (input) {
      setIsSearching(true);
    }
  };
  const paginate = (number) => setCurrentPage(number);

  const close = () => {
    setIsSearching(false);
    setInput('');
  };

  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <>
      <div className="col-10 offset-1">
        <div className="row">
          <h5 className="col-sm-6">Package list</h5>
          <div className="col-sm-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search..."
                aria-describedby="inputGroupPrepend"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {' '}
                  <button type="submit" className="btn" onClick={search}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
        {isSearching && (
          <div className="close">
            <FontAwesomeIcon icon={faX} onClick={close} />
          </div>
        )}
        <table className="table table-striped my-3">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Created By</th>
              <th scope="col">Date </th>
              <th colSpan={2} scope="col">
                <FontAwesomeIcon
                  className="ms-4"
                  style={{ cursor: 'pointer' }}
                  icon={faPlusSquare}
                  size="2xl"
                  onClick={handleAdd}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPackages.map((pack, ind) => {
              return (
                <>
                  <tr key={pack._id + 0}>
                    {/* <th key={pack._id} scope="row">
                      {ind + 1}
                    </th> */}
                    <td
                      key={pack._id + 1}
                      onClick={() => navigate(`/package/single/${pack._id}`)}
                    >
                      {pack.title}
                    </td>
                    <td key={pack._id + 2}>
                      {pack.description.substring(0, 20)}...
                    </td>
                    <td key={pack._id + 3}>
                      {users.find((o) => o._id === pack.user).name}
                    </td>
                    <td key={pack._id + 4}>
                      {new Date(pack.createdAt).toDateString()}
                    </td>
                    {/* <td key={pack._id + 5}>
                      <button
                        key={pack._id + 6}
                        className="btn btn-success"
                        onClick={() => handleEdit(pack._id)}
                        name={pack._id}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td> */}
                    <td key={pack._id + 7}>
                      <button
                        key={pack._id + 8}
                        className="btn btn-danger"
                        onClick={() => handleDelete(pack._id)}
                        name={pack._id}
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={packages.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default PackageList;
