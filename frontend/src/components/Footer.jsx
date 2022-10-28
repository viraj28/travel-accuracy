import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer bg-light mt-10 py-3">
        <div className="container text-center">
          <p>
            Copyright &copy; {new Date().getFullYear()} Travel Accuracy. All
            rights reserved | This Website is made with &hearts; |{' '}
            <Link to="/privacy" target="_blank">
              Privacy Policy
            </Link>{' '}
            <Link to="/refund" target="_blank">
              | Refund Policy
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
