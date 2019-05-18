import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

// re-rendering 막기 전 코드다.
class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  }

  /* 하드코드 방식이라서 구리다.
  onNameChange = (e) => {
    this.setState({name: e.target.value});
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }
  onPhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  }
  */

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // * 또다른 Error 코드
    // for (let prop in this.state) {
    //   if (prop === 'errors') continue;
    //   else if (!this.state[prop]) {
    //     this.setState((prevState) => {
    //       prevState.errors[prop] = `${prop} is required.`
    //       return prevState;
    //     });
    //   } else {
    //     this.setState((prevState) => {
    //       delete prevState.errors[prop];
    //       return prevState;
    //     })
    //   }
    // }

    // if (!name || !email || !phone) return;


    // Check for Errors
    // this.state.name 이라는 것을 잊지 말자
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' }});
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      // universally unique ID
      // uuid로 새 contact에 id를 쉽게 부여
      // id: uuid(),
      name,
      email,
      phone,
    };

    // dispatch({ type: 'ADD_CONTACT', payload: newContact });

    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
      // .then(res =>
      //   dispatch({ type: 'ADD_CONTACT', payload: res.data }));
    dispatch({ type: 'ADD_CONTACT', payload: res.data });



    // clear state : addcontact하고 나서 form을 빈값으로 정리
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    // AddContact.js에서 add후 redirect 
    // redirect시 데이터가 사라지고 reload되니까 firebase로 처리
    this.props.history.push('/');
  };

  // input에 name속성 이용
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup 
                    label="Name"
                    name="name"
                    // placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    // placeholder="Enter email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    // placeholder="Enter phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  {/* {Object.keys(this.state).map(field => {
                    console.log(field);
                    return (
                      <TextInputGroup
                        label={field}
                        name={field}
                        value={this.state[field]}
                        placeholder="Enter"
                        type={field}
                        onChange={this.onChange}
                        key={field}
                      />
                    );
                  })}; */}
                  
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
    // 태그들을 모두 Consumer안으로 옮긴다.
    // return (
      // <div></div>
    // )
  }
}

export default AddContact;


// 간결한 코드!
// return (
//   <Consumer>
//     {context => (
//       <div className="card mb-3">
//         <div className="card-header">Add Contact</div>
//         <div className="card-body">
//           <form
//             onSubmit={e => {
//               e.preventDefault()
//               context.dispatch({
//                 type: 'ADD_CONTACT',
//                 payload: this.state
//               })
//               this.setState({ name: '', email: '', phone: '' })
//             }}>
//             {Object.keys(this.state).map(field => (
//               <div className="form-group" key={field}>
//                 <label
//                   htmlFor={field}
//                   style={‌{textTransform: 'capitalize' }}>
//                       {field}
//                     </label>
//               <input
//                 type="text"
//                 name={field}
//                 className="form-control form-control-lg"
//                 placeholder={`Enter ${field}...`}
//                 value={this.state[field]}
//                 onChange={e => this.setState({ [field]: e.target.value })}
//               />
//                   </div>
//           ))}
//                 <input
//               type="submit"
//               value="Add Contact"
//               className="btn btn-block btn-light"
//             />
//           </form>
//         </div>
//       </div>
//     )}
//   </Consumer>
// )
