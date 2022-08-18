import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="footer bg-light mt-10 py-3">
        <div className="container text-center">
          <p>
            Copyright &copy; {new Date().getFullYear()} Travel Guardian. All
            rights reserved | This Website is made with{' '}
            <span className="text-danger">&hearts;</span>"
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
