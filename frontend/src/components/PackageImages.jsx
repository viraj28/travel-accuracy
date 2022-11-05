import React from 'react';
import './PackageImages.css';

const PackageImages = ({ imgArray }) => {
    let imagesArray = new Array(imgArray?.length);
    if (imgArray) {
        // console.log(imagesArray);

        for (var i = 0; i < imgArray.length; i++) {
            imagesArray[i] =
                `data:${imgArray[i]?.contentType};base64,` +
                imgArray[i]?.imgBase64;
            // console.log(imagesArray[i]);
        }
    }

    switch (imagesArray.length) {
        case 1:
            return (
                <div className="row p-5">
                    <div className="col-md-3 h-100">
                        <div className="row ">
                            <img
                                className="img-responsive "
                                src={imagesArray[0]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="row p-5">
                    <div className="col-md-4 ">
                        <div className="row ">
                            <img
                                className="img-responsive packimg "
                                src={imagesArray[0]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="row ">
                            <img
                                className="img-responsive "
                                src={imagesArray[1]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className="row p-5 h-50 overflow-hidden">
                    <div className="col-md-3  h-100">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[0]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-3  ">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[1]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[2]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="row p-5 h-50 overflow-hidden">
                    <div className="col-md-3  h-100">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[0]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-3  ">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[1]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[2]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row  overflow-hidden">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[3]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            );
        case 5:
            return (
                <div className="row p-5">
                    <div className="col-md-4 h-100">
                        <div className="row mb-3">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[0]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <div className="row">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[1]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-4 h-100">
                        <div className="row py-2">
                            <img
                                src={imagesArray[2]}
                                width={300}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="col-md-4 h-100">
                        <div className="row mb-3">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[3]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <div className="row">
                            <img
                                className="img-responsive packimg"
                                src={imagesArray[4]}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            );

        default:
            return <div className="mb-5"></div>;
    }
};

export default PackageImages;
