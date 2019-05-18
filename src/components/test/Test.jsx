// Life cyle - Test 코드
// https://velopert.com/3631

import React, { Component } from 'react';

class Test extends Component {
  state ={
    title: '',
    body: ''
  }

  componentDidMount() {
    // console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => this.setState({
        title: data.title,
        body: data.body,
      }));
  }

  // Legacy
  // WillMount, WillReceiveProps, WillUpdate

  // 앞으로는 DidMount에서 처리가능
  componentWillMount() {
    console.log('componentWillMount');
  }

  // context.jsx에 놓고 update되면 실행된다/
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }
  
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  // Deprecated function
  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('componentWillReceiveProps');
  // }

  // Legacy
  // Props로부터 파생된 State를 얻었다.는 의미
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // return null;
  //   return {
  //     test: 'something'
  //   }
  // };

  // Legacy
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate');
  // }
  
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
