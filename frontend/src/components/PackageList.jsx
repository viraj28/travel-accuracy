import React from 'react';
import { useNavigate } from 'react-router-dom';

const PackageList = ({ packages }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/package/add');
  };

  const handleEdit = (e) => {
    console.log(e.target.name);
    navigate(`/package/edit/${e.target.name}`);
  };
  const handleDelete = (e) => {};

  return (
    <>
      <div className="col-10 offset-1">
        <h5>Package list</h5>
        <table className="table table-striped my-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Created By</th>
              <th scope="col">Date </th>
              <th colSpan={2} scope="col">
                <button className="btn btn-primary ms-5" onClick={handleAdd}>
                  Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pack, ind) => {
              return (
                <>
                  <tr key={pack._id}>
                    <th scope="row">{ind + 1}</th>
                    <td>{pack.title}</td>
                    <td>{pack.description.substring(0, 20)}...</td>
                    <td>{pack.user}</td>
                    <td>{new Date(pack.createdAt).toDateString()}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={handleEdit}
                        name={pack._id}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleDelete}
                        name={pack._id}
                      >
                        Delete
                      </button>
                      {/* <!-- Modal --> */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Delete
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">Sure to Delete?</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default PackageList;
