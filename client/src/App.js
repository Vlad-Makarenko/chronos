import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';
import { ScrollToTop } from './components/ScrollToTop';
import { checkAuth } from './store/authSlice';
import { useModal } from './hooks/modal.hook';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const routes = useRoutes();
  const modals = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

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
