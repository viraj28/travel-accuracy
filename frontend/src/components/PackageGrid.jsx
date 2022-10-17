import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import Card from './Card';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const PackageGrid = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
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

        const data = res.data;

        setPackages(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, [user]);

  const handleCardClick = (id) => {
    navigate(`/package/single/${id}`);
  };

  //Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPackages = packages.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (number) => setCurrentPage(number);

  return (
    <>
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

      {currentPackages.map((val, ind) => {
        return (
          <Card
            key={ind}
            imgsrc={
              'http://localhost:5000' + val.packageImages[0].substring(7) ||
              val.packageImage
            }
            title={val.title}
            desc={val.description}
            isPackage={true}
            duration={val.duration}
            price={val.price}
            customClick={() => handleCardClick(val._id)}
          />
        );
      })}
      <p></p>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={packages.length}
        paginate={paginate}
      />
    </>
  );
};

export default PackageGrid;
