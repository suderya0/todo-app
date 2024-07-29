import React from 'react';
import dynamic from 'next/dynamic';


// Dinamik olarak bileşeni istemci tarafında yükleyin
const Calendar = dynamic(() => import('../components/Calender'), {
  ssr: false // Sunucu tarafında render edilmemesi için
});

const Home: React.FC = () => {
  return (
    <div>
      <Calendar />
    </div>
  );
}

export default Home;
