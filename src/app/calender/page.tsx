import React from 'react';
import dynamic from 'next/dynamic';



const Calendar = dynamic(() => import('../components/Calender'), {
  ssr: false 
});

const Home: React.FC = () => {
  return (
    <div>
      <Calendar />
    </div>
  );
}

export default Home;
