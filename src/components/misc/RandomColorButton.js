import React, { useState } from 'react';
import { tailwindColors } from '../../utils';

const getRandomColor = (colors) => {  
  const random_color = Math.floor(Math.random() * colors.length);
  return colors[random_color]
};

function checkColor(c) {
  const gradient = parseInt(c.substring(c.length - 3))

  return gradient > 500 ? 'text-[#E6E4DD]' : 'text-[#222019]'
}

const RandomColorButton = () => {
  const [buttonColor, setButtonColor] = useState('bg-black');
  const [textColor, setTextColor] = useState('text-[#E6E4DD]');

  const changeColor = () => {
    let color = getRandomColor(tailwindColors);
    setButtonColor(color);
    setTextColor(checkColor(color));
  };

  return (
    <button className={`px-4 py-2 rounded ${textColor} ${buttonColor}`} onClick={changeColor}>
      Click to change colors
    </button>
  );
};

export default RandomColorButton;
