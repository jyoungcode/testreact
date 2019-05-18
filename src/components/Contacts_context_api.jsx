import React, { Component, Fragment } from 'react';
import Contact from './Contact';
import { Consumer } from '../context';

// 작은규모앱에서 사용하기 좋은 ContextAPI를 소개하려고 만든코드

class Contacts extends Component {
  // state만 있다면 constructor를 안써도 된다. 그러나 다른 초기화가 필요하면 contructor 사용해야 한다.

  // constructor() {
  //   super();
  //   this.state = {

  /* context.jsx로 옮긴다.
  state = {
    contacts: [
      {
        id: 1,
        name: 'jyoung',
        email: 'jyoung@gmail.com',
        phone: '111-222-333'
      },
      {
        id: 2,
        name: 'gloria',
        email: 'gloria@gmail.com',
        phone: '0514-222-333'
      },
      {
        id: 3,
        name: 'joji',
        email: 'joji@gmail.com',
        phone: '331-222-333'
      },
    ]
  };
  */

  /* 연결 순서
    1. Contact.js : onClick={this.onDeleteClick}
    2. Contact.js : onDeleteClick() this.props.deleteClickHandler();
    3. Contacts.js : deleteClickHandler={this.deleteContact}
    4. Contacts.js 지금 deleteContact ()
  */

  
  deleteContact = (id) => {
    // const { contacts } = this.state;

    // newContacts : 내가 클릭한 id가 아닌 나머지
    // const newContacts = contacts.filter(contact => contact.id !== id);

    // 즉, 클릭한 걸 제외하고 나머지를 contacts에 덮어쓰는거다.
    // this.setState({
    //   contacts: newContacts
    // });

    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  render() {
    // 
    return (
      // Provider에서 연결받은 value이다.
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <Fragment>
              {contacts.map(contact => (
                <Contact
                  key={contact.id}
                  contact={contact}
                  deleteClickHandler={this.deleteContact.bind(this, contact.id)}
                />
              ))}
            </Fragment>
          );
        }}
      </Consumer>
    )

     
    // const { contacts } = this.state;
    // return (
    //   <Fragment>
    //     {/* key: state 배열에서 각 item을 식별하고 변동사항이 있는지 알기 위해 사용. 값은 id로 적당하다 */}
    //     {
    //       contacts.map(contact => (
    //         <Contact
    //           key={contact.id}
    //           // name={contact.name} 
    //           // email={contact.email} 
    //           // phone={contact.phone}
    //           contact={contact}
    //           deleteClickHandler={this.deleteContact.bind(this, contact.id)}
    //         />
    //       ))
    //     }
    //   </Fragment >
    // );
  }
}

export default Contacts;