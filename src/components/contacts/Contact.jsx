import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
  state = {
    // 
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    // this.props.deleteClickHandler();
    // dispatch({ type: 'DELETE_CONTACT', payload: id });

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // .then(res => dispatch({ type: 'DELETE_CONTACT', payload: id }));

      // setState할게 아니라서 그냥 res를 안받음
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch(e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
      
  }

  onShowClick = (e) => {
    this.setState({ 
      // toggle을 만들기위한 방식
      showContactInfo: !this.state.showContactInfo
    });
  }

  render() {
    // Contacts.js에서 map으로 contact을 받음
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      // App.js에서 <Provider value={this.state}>다.
      // 그걸 받아서 Consumer에서 value를 사용하고 Provider의 state안에는 dispatch가 있다. 
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>{name}{' '}
                <i
                  // onClick={()=> this.setState}
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <NavLink to={`contact/edit/${id}`}>
                  <i 
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem',
                    }}
                  />
                </NavLink>

              </h4>
              {showContactInfo ? (<ul className="list-group">
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
              </ul>) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

// propTypes는 밖에 쓰자
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  // deleteClickHandler: PropTypes.func.isRequired,
}

export default Contact;