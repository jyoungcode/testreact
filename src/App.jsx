import React, { Component } from 'react';
/*
  * BrowserRouter: 모든 router를 저장된 parent component
  * Router: jsx로 태그
  * Switch: default page를 말함 not found page같이, switch안에서 모든 path 이동
*/
// BrowserRouter 대신에 githubpage를 위해 HashRouter
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import Contact from './components/Contact';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Test from './components/test/Test';

import { Provider } from './context';

// node-modules에 있는 것
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/*
  04 App.js
  1. npm install --save bootstrap
    - 부트스트랩 적용
  2. fontawesome 적용
  3. event 적용법 Contact.js
  4. Fragment로 적용하면 쓸때없는 div가 없어짐
  5. changing state
    - this.state로 변경못함! 
    - setState 사용!
  6. changing state from other component
  7. ContextAPI , provider state
    - redux는 큰 프로젝트에서 contextapi는 작은단위유용함(single place일때)
    - action, dispatch, reducer 개념 적용!
  8. AddContact.js 컴포넌트 추가
    - onChange(): component controll
    - onSubmit()
  9. Uncontrolled component , Ref
    - 모든 컴포넌트가 re-rendering 되기때문에 고쳐야한다.
  10. InputGroup componenet
    - AddContact.jsx에서 .form-group이 중복되니까 layout/TextInputGroup.jsx로 뺀다
    - Object.key 이용법 알아보자
  11. Error checking
    - TextInputGroup.jsx 에 error 체크 코드
    - npm i classnames (classname을 쉽게 추가해주는 모듈)
      - bootstrap으로 errors class 넣기위해사용
  12. React Router 
    - npm i react-router-dom
    - about
    - Header.js
    - NavLink(or Link) 사용, param 연결, AddContact.js에서 form보내고 redirect
    - pages/NotFound.jsx
  13. Life cycle - Test.jsx / context.jsx
    - json placeholder 사용
  14. axios 설치
    - Promise based HTTP client for the browser and node.js
    - npm i axios
    - axios를 사용하여 GET,POST,DELETE,UPDATE 만든다.
    - async await 사용
  15. EditContact.jsx를 만든다.
*/

class App extends Component {
  render() {
   return (
     <Provider>
       {/* Router, Route 차이 */}
       <Router>
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          {/* <Contact name="john doe" email="jyoung@gmail.com" phone="555-55-5555" />
          <Contact name="karen" email="karen@gmail.com" phone="555-55-5555" />  */}
          {/* <AddContact />
          <Contacts /> */}
          <Switch>
            {/* route하나에 여러 component */}
            {/* <Route path='/somepath' render={props =>
              <div>
                <ComponentA />
                <ComponentB />
              </div>
            } /> */}

            <Route exact path="/" component={Contacts} />
            <Route exact path="/contact/add" component={AddContact} />
            <Route exact path="/contact/edit/:id" component={EditContact} />
            {/* About.js에서 param 연결시키는법 */}
            {/* <Route exact path="/about/:name" component={About} /> */}
            <Route exact path="/about" component={About} />
            <Route exact path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
       </Router>
     </Provider>
   );
  }
}

export default App;