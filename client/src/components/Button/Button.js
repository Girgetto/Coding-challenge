import React from 'react';

const Button = ({
    className, text, handleClick,
}) => (
    <button
        className={className}
        onClick={handleClick}
    >
       {text} 
    </button>
);

export default Button;