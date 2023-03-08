import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthForm from './component/form/AuthForm';
import PrizeForm from './component/form/PrizeForm';
import { UsersList } from './component/list/UsersList';
import PrizesList from './component/list/PrizesList';
import SpinList from './component/list/SpinList';
import SpinPrizeList from './component/list/SpinPrizeList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthForm />} />
          <Route path='/prize/create' element={<PrizeForm prizeId={4} />} />
          <Route path='/user/list' element={<UsersList />} />
          <Route path='/prize/list' element={<PrizesList />} />
          <Route path='/spin/list' element={<SpinList />} />
          <Route path='/spin-prize/list' element={<SpinPrizeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
