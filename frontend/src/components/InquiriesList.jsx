import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import { deleteInquiry } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

const InquiriesList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [packages, setPackages] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
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
                const res3 = await axios.get('/api/inquire/all', config);
                const res = await axios.get('/api/packages', config);
                const res2 = await axios.get('/api/users/all', config);
                const data = res.data;
                const usersData = res2.data;
                const inquireData = res3.data;
                // console.log(data);
                setInquiries(inquireData.data);
                setPackages(data);
                setUsers(usersData.data);
                setIsLoading(false);
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

            let inquiriesAfterDelete = inquiries.filter(
                (inq) => inq._id !== id
            );

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

    //Get Current Inquiries
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentInquiries = inquiries.slice(indexOfFirstPost, indexOfLastPost);
    if (isSearching) {
        currentInquiries = inquiries.filter((inq) => {
            if (inq.text.toLowerCase().includes(input.toLowerCase())) {
                return inq;
            }
            return null;
        });
    }
    const search = () => {
        if (input) {
            setIsSearching(true);
        }
    };

    const close = () => {
        setIsSearching(false);
        setInput('');
    };

    const paginate = (number) => setCurrentPage(number);

    if (isLoading) {
        return <LoadingSpinner />;
    }

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
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                required
                            />
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    {' '}
                                    <button
                                        type="submit"
                                        className="btn"
                                        onClick={search}
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
                <table className="table table-striped my-3">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Inquiry</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone </th>
                            <th scope="col">Package </th>
                            <th scope="col">Date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInquiries.map((inq, ind) => {
                            return (
                                <>
                                    <tr key={inq._id + 0}>
                                        {/* <th key={inq._id + 'a'} scope="row">
                      {ind + 1}
                    </th> */}
                                        <td key={inq._id + 1}>{inq.text}</td>
                                        <td key={inq._id + 2}>
                                            {
                                                users.find(
                                                    (o) => o._id === inq.user
                                                ).name
                                            }
                                        </td>
                                        <td key={inq._id + 3}>
                                            {
                                                users.find(
                                                    (o) => o._id === inq.user
                                                ).email
                                            }
                                        </td>
                                        <td key={inq._id + 6}>{inq.phone}</td>
                                        <td key={inq._id + 5}>
                                            {getPackageTitle(inq.package)}
                                        </td>
                                        <td key={inq._id + 4}>
                                            {new Date(
                                                inq.createdAt
                                            ).toDateString()}
                                        </td>

                                        <td key={inq._id + 7}>
                                            <button
                                                key={inq._id + 8}
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(inq._id)
                                                }
                                                name={inq._id}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                />
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

export default InquiriesList;
