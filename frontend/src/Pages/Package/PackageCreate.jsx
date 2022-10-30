import { toast } from 'react-toastify';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';

import HorizontalFormInput from '../../components/HorizontalFormInput';
import { addPackage } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

const MAX_COUNT = 4;

const PackageCreate = () => {
  const [fileLimit, setFileLimit] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    packageImages: [],
  });

  const inputs = [
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
      id: 'durationInput',
      name: 'duration',
      label: 'Duration',
      type: 'text',
      required: true,
      autoComplete: 'off',
    },
    {
      id: 'priceInput',
      name: 'price',
      label: 'Price',
      type: 'Number',
      required: true,
      autoComplete: 'off',
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

  const handleUploadFiles = (files) => {
    // Add files to state
    const uploaded = [];
    let limitExceeded = false;

    files.map((file) => {
      // console.log(file);
      if (uploaded.length > MAX_COUNT) {
        toast.info(`You can add only maximum of ${MAX_COUNT + 1} files`);
        setFileLimit(false);
        limitExceeded = true;
        return true;
      }
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        if (uploaded.length === MAX_COUNT || uploaded.length < MAX_COUNT) {
          setFileLimit(true);
          console.log('FileLimit', fileLimit);
        }

        uploaded.push(file);
      }
      return true;
    });
    //Update the state.
    if (!limitExceeded) {
      setData((preVal) => {
        return {
          ...preVal,
          packageImages: uploaded,
        };
      });
    }
  };

  const handleFileEvent = (e) => {
    // Get files from the input event change
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const { user } = useContext(AuthContext);

  const formSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('duration', data.duration);
    formData.append('price', data.price);
    data.packageImages.forEach((img) => {
      formData.append('packageImages', img);
    });
    await addPackage(formData, config);
    setData({
      title: '',
      description: '',
      packageImages: '',
      price: '',
      duration: '',
    });
  };

  useEffect(() => {});

  return (
    <>
      <section className="section my-3">
        <div className="container">
          <div className="row ">
            <div className="col-sm-6 mx-auto ">
              <h3 className="text-center">Add Package</h3>
              <form onSubmit={formSubmit} className="my-5">
                {inputs.map((input) => (
                  <HorizontalFormInput
                    key={input.id}
                    {...input}
                    value={data[input.name]}
                    onChange={InputEventHandler}
                  />
                ))}
                <div className="mb-4">
                  <input
                    className="form-control"
                    type="file"
                    id="packageImages"
                    name="packageImages[]"
                    accept="image/png image/jpeg image/jpg"
                    onChange={handleFileEvent}
                    multiple
                  />
                </div>

                {/* <!-- Submit button --> */}
                <button
                  className={` btn btn-outline-primary btn-block mb-4 ${
                    fileLimit ? '' : 'disabled'
                  } `}
                  type="submit"
                >
                  Add Package
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageCreate;
