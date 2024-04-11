import React from 'react';
import invalidPage from './invalidPage.png';
import './InvalidPage.css';
import { Link } from 'react-router-dom';

const InvalidPage = () => {
 return (
 <div className="invalidPageContainer">
      <div className="invalidPage-image-container">
          <img src={invalidPage} alt="Invalid Page" className="invalidPageImage" />
      </div>
      <div className="invalidPageButtonContainer">
        <Link to="/">
          <button type="button">Go to Home Page</button>
        </Link>
      </div>
 </div>
 );
};

export default InvalidPage;
