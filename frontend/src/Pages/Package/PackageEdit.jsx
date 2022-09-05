import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HorizontalFormInput from '../../components/HorizontalFormInput';

const PackageEdit = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({
    id: '',
    title: '',
    description: '',
    packageImages: [],
    user: '',
    createdAt: '',
  });

  const inputs = [
    {
      id: 'idInput',
      name: 'id',
      type: 'text',
      label: 'Id',
      required: true,
      disabled: true,
    },
    {
      id: 'titleInput',
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      autoComplete: 'off',
    },
    {
      id: 'descInput',
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      autoComplete: 'off',
    },
    {
      id: 'userInput',
      name: 'user',
      label: 'User',
      type: 'text',
      disabled: true,
    },
    {
      id: 'createdInput',
      name: 'createdAt',
      label: 'Created At',
      type: 'text',
      disabled: true,
    },
  ];

  const InputEventHandler = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = () => {};

  const fetchPackageDetails = async (id) => {};

  useEffect(() => {});

  return (
    <>
      <section className="section my-3">
        <div className="container">
          <div className="row ">
            <div className="col-sm-6 mx-auto">
              <h3 className="text-center">Edit Package Info</h3>
              <form onSubmit={formSubmit} className="my-5">
                {inputs.map((input) => (
                  <HorizontalFormInput
                    key={input.id}
                    {...input}
                    value={data[inputs.name]}
                    onChange={InputEventHandler}
                  />
                ))}
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                  />
                </div>

                {/* <!-- Submit button --> */}
                <button
                  className="btn btn-outline-primary btn-block mb-4 "
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageEdit;
