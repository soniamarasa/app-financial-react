import React from 'react';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import './Home.scss';
import Charts from '../../components/Charts/Charts';

export const Home = () => {
  return (
    <div className="home-container">
      <HeaderDashboard />

      <div className='body-container grid'>
        <Charts />
        <Charts />
        <Charts />
        <Charts />
      </div>
    </div>
  );
};
