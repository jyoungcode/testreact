import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import './contact.css';

class Contact extends Component {
  // constructor() {
  //   super();
  //   this.state = {};
  //   this.onShowClick = this.onShowClick.bind(this);
  // }

  /*
  onShowClick() {
    // 이 커스텀함수는 ReactLifeCycle에 들어가지 않아서 여기서 this가 무엇인지 모른다. 그래서 아래 onClick에서 .bind를 하거나, constructor에서 정의해야한다.
    console.log(this.state);
  }
  */

  state = {
    // 
    showContactInfo: false
  };

  onDeleteClick = () => {
    // console.log('clicked');
    this.props.deleteClickHandler();
  }

  // 화살표함수로 this를 쉽게 해결할 수 있다.
  // * state는 immutable(불변), 그러니 override가 안된다. setState 쓰자!
  onShowClick = (e) => {
    // this.state = {
    //   showContactInfo: false
    // };
    this.setState({ 
      // toggle을 만들기위한 방식
      showContactInfo: !this.state.showContactInfo
    });
  }

  render() {
    // 3가지 방식에 따라서 Contacts.js 변경과 jsx에 {}바인딩 변경
    // jsx: {name} , Contacts.js: name={}
    // const { name, email, phone } = this.props; 

    // jsx: {contact.name} , Contacts.js: contact={contact}
    // const { contact } = this.props;

    // jsx: {name} , Contacts.js: contact={contact}
    const { name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <div className="card card-body mb-3">
        <h4>{name} 
          <i
            // onClick={()=> this.setState}
            onClick={this.onShowClick} 
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
          />
          <i 
            className="fas fa-times" 
            style={{ cursor: "pointer", float: "right", color: "red" }}  
            onClick={this.onDeleteClick}
          />
        </h4>
        {/* toggle방식으로 보여주기 */}
        {/* {showContactInfo && (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        )} */}

        {showContactInfo ? (<ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>) : null}
      </div>
    )
  }
}

// propTypes는 밖에 쓰자
Contact.propTypes = {
  // name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  // phone: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  deleteClickHandler: PropTypes.func.isRequired,
}

export default Contact;