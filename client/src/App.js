import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';
import { ScrollToTop } from './components/ScrollToTop';
import { useModal } from './hooks/modal.hook';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const routes = useRoutes();
  const modals = useModal();
  return (
    <div>
      <ToastContainer />
      <Router>
        <NavBar />
        <div className='App'>{routes}</div>
        <ScrollToTop />
        {modals}
      </Router>
    </div>
  );
};

export default App;
