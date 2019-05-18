import React, { Component } from 'react';
import Contact from './components/Contact';
import Header from './components/Header';

import './App.css';

/*
  03 App.js
  1. Header.js에 CSS 적용
    - inline 방법 적용
    - const 변수 객체로 빼서 적용
    - component/contact.css 
    - *그렇지만 App.css로 global 위치에서 쓰는 것을 추천!
*/

class App extends Component {
  render() {
   return (
    <div className="App">
      <Header branding="Contact Manager" />
      <Contact name="john doe" email="jyoung@gmail.com" phone="555-55-5555" />
       <Contact name="karen" email="karen@gmail.com" phone="555-55-5555" />
    </div>
   );
  }
}

export default App;