import { useState } from 'react';
import './FormInput.css';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, showotpfield, id, ...inputProps } =
    props;
  // console.log('show', showotpfield);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div
      className={
        inputProps.name === 'otp' && !showotpfield ? 'mb-3 d-none' : 'mb-3'
      }
    >
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
