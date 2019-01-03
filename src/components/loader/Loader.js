import React from 'react';
import logo from '../../images/logo.svg';
import './Loader.scss';

const Loader = () => {
   return (
      <div className="loader">
         <img src={logo} alt="loading..." />
      </div>
   );
};

export default Loader;