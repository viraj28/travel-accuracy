import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import Card from './Card';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

const PackageGrid = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [isSearching, setIsSearching] = useState(false);
    const [input, setInput] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useContext(AuthContext);
    useEffect(() => {
        async function fetchPackages() {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            try {
                setIsLoading(true);
                const res = await axios.get('/api/packages', config);

                const data = res.data;

                setPackages(data);
                setIsLoading(false);
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

    const paginate = (number) => {
        setCurrentPage(number);
    };

    const close = () => {
        setIsSearching(false);
        setInput('');
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <>
            <div className="row">
                <h5 className="col-sm-6">Package list</h5>
                <div className="col-sm-6">
                    <div className="input-group">
                        <input
                            type="text"
                            value={input}
                            className="form-control"
                            id="search"
                            placeholder="Search..."
                            aria-describedby="inputGroupPrepend"
                            onChange={(e) => setInput(e.target.value)}
                            required
                        />
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {' '}
                                <button
                                    type="submit"
                                    onClick={search}
                                    className="btn"
                                >
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
            {currentPackages.map((val, ind) => {
                return (
                    <Card
                        key={ind}
                        imgsrc={
                            `data:${val.packageImages[0]?.contentType};base64,` +
                            val.packageImages[0]?.imgBase64
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
