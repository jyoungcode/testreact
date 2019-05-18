import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

// rafce 단축탭

// AddContact.jsx에서 중복되는 .form-group을 component로 만든다

// const TextInputGroup = (props) 대신 객체로 넣는다.
const TextInputGroup = ({
  label,
  name,
  value,
  // placeholder,
  type,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        // *NPM module classnames 사용!
        // className={classnames('form-control form-control-lg', {
        //   'is-invalid': error
        // })}

        // *모듈없이!
        className={
          error
            ? "is-invalid form-control form-control-lg"
            : "form-control form-control-lg"
        }
        // placeholder={placeholder}
        placeholder={`Enter ${label}...`}
        value={value}
        onChange={onChange}
        // required
      />
      {error && <div className="invalid-feedback">{error}</div>}
      
    </div>
  );
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

TextInputGroup.defaultProps = {
  type: 'text',
}

export default TextInputGroup;
