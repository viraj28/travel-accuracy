import { useState } from 'react';
import './FormInput.css';

const HorizontalFormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="row mb-4">
      <label className="form-label col-sm-2">{label}</label>
      <div className="col-sm-10">
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
    </div>
  );
};

export default HorizontalFormInput;
