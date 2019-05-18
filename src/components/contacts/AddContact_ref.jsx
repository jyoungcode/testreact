import React, { Component } from 'react';

/* re-rendering 방지를 위한 코드
  * Uncontrolled component 
    - state없이 이용되는 컴포넌트를 말함!
    - form field input에서 value 속성이 사용됐는데 onChange가 없다면 defaultValue를 사용하거나
    - onChange(), readOnly를 사용해라
  
  * Ref ( Reference )
    - DOM에 직접적은 접근이 필요할때
    1. input / textarea 등에 포커스를 해야 할때
    2. 특정 DOM 의 크기를 가져와야 할 때
    3. 특정 DOM 에서 스크롤 위치를 가져오거나 설정을 해야 할 때
    4. 외부 라이브러리 (플레이어, 차트, 캐로절 등) 을 사용 할 때

    - Ref를 통해서 form값을 넘길 수가 있다!

  * 여기서 사실 ref가 필요없다
    보통 focus event나 element blur 처리들 DOM에 접근할때 사용한다.
*/

class AddContact extends Component {
  // state = {
  //   name: '',
  //   email: '',
  //   phone: ''
  // }

  // 여기서는 props를 이용하기 때문에 props를 넣고
  // 그냥 constructor를 쓰는건 생략해도된다 babel에서 처리해주기 때문에
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
    }
    console.log('contact: ', contact);
  }

  // input에 name속성 이용
  // onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  
  // redux store를 이용할때 너의 컴포넌트에 이런 props를 mapping해야한다.
  static defaultProps = {
    name: 'young',
    email: 'young@gmail.com',
    phone: '111-222-333',
  }

  render() {
    // const { name, email, phone } = this.state;
    // defaultProps를 사용 ( redux store를 가정하고 쓴다. )
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name"
                className="form-control form-control-lg" 
                placeholder="Enter name..."
                defaultValue={name}
                ref={this.nameInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="Enter Email..."
                defaultValue={email}
                ref={this.emailInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control form-control-lg"
                placeholder="Enter Phone..."
                defaultValue={phone}
                ref={this.phoneInput}
              />
            </div>
            <input 
              type="submit" 
              value="Add Contact"
              className="btn btn-light btn-block" 
            />
          </form>
        </div>
      </div>
    )
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