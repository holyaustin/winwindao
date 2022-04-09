import React from 'react';

const Footer = () => {
  return (
    <p className="bg-green-900 text-white text-xl text-center pb-5 pt-5">
      Copyright &copy; {new Date().getFullYear()} WinWin DAO
    </p>
  );
}

export default Footer