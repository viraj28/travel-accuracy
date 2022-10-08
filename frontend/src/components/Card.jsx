import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({
  imgsrc,
  title,
  desc,
  duration,
  isPackage,
  price,
  customClick,
}) => {
  return (
    <>
      <div className="col-md-4 col-10 mx-auto gy-4">
        <div
          className={
            isPackage ? 'card bg-image hover-zoom h-100' : 'card bg-image h-100'
          }
          onClick={customClick}
        >
          <img src={imgsrc} className="card-img-top h-100 " alt={imgsrc} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            {isPackage && (
              <div className="d-flex justify-content-between">
                <div className="text-muted">
                  <FontAwesomeIcon icon={faClock} /> {duration}
                </div>
                <div className="text-success">
                  <FontAwesomeIcon icon={faIndianRupeeSign} color="green" />{' '}
                  {price}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
