// Store의 역할로 redux처럼
// Provider라고 하며 모든 컴포넌트의 wrap 컴포넌트가 된다.

// https://velopert.com/3606

import React, { Component } from 'react';
import axios from 'axios';
// import uuid from 'uuid';

const Context = React.createContext();

// Redux대신 이건 ContextAPI
// reducer(변형,축소): action으로 state가 바뀐 결과에 대한것을 말함
// dispatch : action을 실행시키는 것을 말함.
const reducer = (state, action) => {
  // payload: action으로 보내기 원하는 데이터를 말한다.
  switch(action.type){
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        // id,name,email,phone 모든정보를 보내고, state.contacts로 새롭게 보낸다.
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact => 
            contact.id === action.payload.id 
              ? (contact = action.payload) 
              : contact
        )
      }
    default:
      return state;
  }
}

export class Provider extends Component {
  state = {
    // contacts: [
    //   {
    //     id: 1,
    //     name: 'jyoung',
    //     email: 'jyoung@gmail.com',
    //     phone: '111-222-333'
    //   },
    //   {
    //     id: 2,
    //     name: 'gloria',
    //     email: 'gloria@gmail.com',
    //     phone: '0514-222-333'
    //   },
    //   {
    //     id: 3,
    //     name: 'joji',
    //     email: 'joji@gmail.com',
    //     phone: '331-222-333'
    //   },
    // ],

    // JSON placeholder이용
    contacts: [],
    // 해당 dispatch로 setState한 상태를 reducer로 보낸다.
    dispatch: action => {
      // reducer {}감싸면 실행안됨
      this.setState(state => reducer(state, action))
    }
    // 아래 <Context.Provier value로 모든 state에 접근가능하게 해야하는데! 그럴러면 dispatch가 어디서든 접근할 수 있도록 해야한다.
  };

  // Provider value를 통해 App.jsx에서는 전체 state를 접근할 수있다.
  // Consumer는 Contacts.jsx에서 사용되거나 다른 컴포넌트 들에서 사용 가능하다. 
  // Provider에 있는 value에서 받아서 Consumer가 그 value를 이어 받을 수 있다.

  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  // res: { data: Array(10), status: 200, statusText: "", headers: { … }, config: { … }, … }
  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then(res => this.setState({ contacts: res.data }))
  // }

  // axios는 fetchAPI만 쓰는 것보다 코드가 간결하다
  // 오직 async 안에서 await가 존재할 수있다.
  // async를 promise를 쉽게 반환. then()을 안써도 된다.
  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    // 전체 user객체들을 배열로 반환하고 있다.
    // 그걸 ...user로 복사한후 id값을 uuid()로 넣는다.
    // console.log(res.data.map(user=>console.log(user)))

    // speard operator
    // const user = [] 있고
    // 그것을 [...user]를 복사후 uuid()를 넣어서 새로반환하는 것
    // this.setState({ contacts: res.data.map(user => ({ ...user, id: uuid() })) });

    // 만약이 코드를 안쓰고 위에 uuid를 쓰면 Edit할때 json placeholder에 user에서 id값 접근시 uuid 때문에 접근이 안된다.
    // 일단 그냥 아래 코드쓰자
    this.setState({ contacts: res.data });
  }


  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;