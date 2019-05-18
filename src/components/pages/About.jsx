import React from 'react';

// const About = (props) => {
const About = () => {
  return (
    <div>
      <h1 className="display-4">About contact manager</h1>
      {/* App.js에서 /about/:id 부분이 params 연결  */}
      {/* <h1 className="display-4">{props.match.params.name}</h1> */}
      <p className="lead">simple app to manage contacts</p>
      <p className="text-secondary">Version 1.0.0</p>
    </div>
  );
};

export default About;
