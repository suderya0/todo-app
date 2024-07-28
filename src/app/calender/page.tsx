// pages/index.tsx
import React from 'react';
import Calendar from '../components/Calender';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>My Basic Calendar</h1>
      <Calendar />
    </div>
  );
};

export default  Calendar;
