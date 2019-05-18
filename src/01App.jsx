import React, { Component }from 'react';

/*
  01App.js
  기본적인 jsx 문법 배우기 1
*/

class App extends Component {
  render() {
    // return React.createElement(
    //   'div',
    //   {className: 'App'},
    //   React.createElement('h1', null, 'The App component')
    // );

    // div대신 fragment나 <> 쓰자

    const name = 'jyoung';
    const showHello = true;
    const showMath = true;
    const num1 = 40;
    const num2 = 23;

    let math;
    if(showMath) {
      math = <h4>{num1} + {num2} = {num1 + num2}</h4>;
    } else {
      math = null;
    }

    return (
      <div className="App">
        <h1>The App Component</h1>
        {showHello ? <h4>Hello {name.toUpperCase()}</h4> : null}
        {math}
      </div>
    );
  }
}

export default App;
