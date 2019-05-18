import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

// re-rendering 막기 전 코드다.
class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  };

  // 여기서 코드는 그냥 jsonplaceholder/user의 테스트 코드다. 왜냐면 내가 Add해서 넣으면 그 contact에 edit가 안된다. 기존 서버에 데이터가 없어서. 그래서 여기서는 users에 있는 것만 접근된다.
  async componentDidMount() {
    // 여기서 get()으로 접근만 하는 코드
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for Errors
    // this.state.name 이라는 것을 잊지 말자
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
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

    // 실제 edit를 put해서 바꾸는 처리
    const updContact = {
      // ES6 name:name을 하나로 처리
      name,
      email,
      phone
    }
    const { id } = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

    dispatch({type: 'UPDATE_CONTACT', payload: res.data});

    // Clear 
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

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
              <div className="card-header">Edit Contact</div>
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

                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
