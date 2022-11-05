import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import { deleteUser } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

const UsersList = () => {
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
                const res2 = await axios.get('/api/users/all', config);

                const usersData = res2.data;

                console.log(usersData);

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

            let usersAfterDelete = users.filter((usr) => usr._id !== id);

            setUsers(usersAfterDelete);

            await deleteUser(id, config);
        } else {
            console.log('no dlete');
        }
    };

    //Get Current Posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);
    if (isSearching) {
        currentUsers = users.filter((usr) => {
            if (usr.name.toLowerCase().includes(input.toLowerCase())) {
                return usr;
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
                    <h5 className="col-sm-6">Users list</h5>
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
                            <th scope="col">Name</th>
                            <th scope="col">Company</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role </th>
                            <th scope="col">Created At </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((usr, ind) => {
                            return (
                                <>
                                    <tr key={usr._id + 0}>
                                        {/* <th key={usr._id + 'a'} scope="row">
                      {ind + 1}
                    </th> */}
                                        <td key={usr._id + 1}>{usr.name}</td>
                                        <td key={usr._id + 2}>
                                            {usr.companyName}
                                        </td>
                                        <td key={usr._id + 3}>{usr.email}</td>
                                        <td
                                            key={usr._id + 6}
                                            className={
                                                usr.role === 'admin'
                                                    ? 'backgroundGreen'
                                                    : ''
                                            }
                                        >
                                            {usr.role}
                                        </td>
                                        <td key={usr._id + 5}>
                                            {new Date(
                                                usr.createdAt
                                            ).toDateString()}
                                        </td>

                                        <td key={usr._id + 7}>
                                            <button
                                                key={usr._id + 8}
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(usr._id)
                                                }
                                                name={usr._id}
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
                    totalPosts={users.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

export default UsersList;
