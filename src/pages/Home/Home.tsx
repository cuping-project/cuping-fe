import styles from './Home.module.css';

function Home() {
  const server = import.meta.env.VITE_SERVER_URL;
  return (
    <div>
      <h1 className="text-2xl font-bold underline">Hello world!!</h1>
      {console.log(import.meta.env.VITE_SERVER_URL)}
    </div>
  );
}

export default Home;
