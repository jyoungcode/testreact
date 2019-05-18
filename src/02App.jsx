import React, { Component } from 'react';
import Contact from './components/Contact';
import Header from './components/Header';

import './App.css';

/*
  02 App.js
  1. Contact.js 컴포넌트 export와 import
  2. Header.js로 react-hooks 만들기 (=함수컴포넌트)
  3. Props를 부르는 방식이 class방식과 hooks가 차이가 있다.
    - class: {this.props.프로퍼티명}
    - hooks: {props.프로퍼티명} + 파라미터에 props 넣어준다.
  4. 각 컴포넌트에서 const {} destructuring assignment(구조분해할당)을 사용
  5. defaultProps
  6. PropTypes 사용
*/

class App extends Component {
  render() {
   return (
    <div className="App">
      <h1>The App Component</h1>
      {/* prop이름 branding처럼 마음대로 가능 */}
      <Header branding="Contact Manager" />
      <Contact name="john doe" email="jyoung@gmail.com" phone="555-55-5555" />
       <Contact name="karen" email="karen@gmail.com" phone="555-55-5555" />
    </div>
   );
  }
}

export default App;