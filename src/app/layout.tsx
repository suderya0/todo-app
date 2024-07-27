//import '../styles/globals.css';
import React from 'react';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Next.js Authentication</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
