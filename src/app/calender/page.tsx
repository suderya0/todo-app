import React from 'react';
import dynamic from 'next/dynamic';

// Dinamik olarak bileşeni istemci tarafında yükleyin
const Calendar = dynamic(() => import('../components/Calender'), {
  ssr: false // Sunucu tarafında render edilmemesi için
});

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Calendar App</h1>
      <Calendar />
    </div>
  );
}

export default Home;
