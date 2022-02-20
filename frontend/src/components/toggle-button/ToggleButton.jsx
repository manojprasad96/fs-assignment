import React from 'react';
import styled from 'styled-components';

const ToggleWrapper =  styled.div`
    display: flex;
    margin-top: 3px;
    .react-switch-checkbox {
        height: 0;
        width: 0;
        visibility: hidden;
    }
    
    .react-switch-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        width: 37.5px;
        height: 18.75px;
        background: grey;
        border-radius: 50px;
        position: relative;
        transition: background-color .2s;
    }
    
    .react-switch-label .react-switch-button {
        content: '';
        position: absolute;
        top: 1px;
        width: 16.875px;
        height: 16.875px;
        border-radius: 22.5px;
        transition: 0.05s;
        background: #fff;
        box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
    }
    
    .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
        left: 100%;
        transform: translateX(-100%);
    }
    
    .react-switch-label:active .react-switch-button {
        width: 30px;
    }

`;


const ToggleButton = (props) => {
  return (
    <ToggleWrapper>
      <input
        checked={props.checked}
        onChange={props.handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: props.checked && '#06D6A0' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </ToggleWrapper>
  );
};

export default ToggleButton;