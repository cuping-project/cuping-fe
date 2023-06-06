import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import OwnerPage from '../pages/OwnerPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="ownerpage" element={<OwnerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
