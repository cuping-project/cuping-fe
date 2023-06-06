import React from 'react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const server = import.meta.env.VITE_SERVER_URL;
  return (
    <div>
      <h1 className="text-2xl font-bold underline">Hello world!!</h1>
    </div>
  );
};

export default Home;
