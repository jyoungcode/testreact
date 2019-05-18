import React from 'react';
// impt
import PropTypes from 'prop-types';

// https://reacttraining.com/react-router/web/api/NavLink
// Link: 해당 path 연결
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { branding } = props;
  return (
    <div>
      {/* <h1 style={{color: 'red', fontSize: '30px'}}>{branding}</h1> */}
      {/* <h1 style={headingStyle}>{branding}</h1> */}
      {/* <h1>{branding}</h1> */}

      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
        <div className="container">
          <a href="/" className="navbar-brand">
            {branding}
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {/* <a href="/" className="nav-link">Home</a> */}
                <NavLink exact to="/" className="nav-link">
                  <i className="fas fa-home" /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact/add" className="nav-link">
                  <i className="fas fa-plus" /> Add
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  <i className="fas fa-question" /> About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Header.defaultProps = {
  branding: {
    name: 'My App'
  }
};

Header.propTypes = {
  branding: PropTypes.string.isRequired,
};

// const headingStyle = {
//   color: 'red',
//   fontSize: '50px'
// };


export default Header;