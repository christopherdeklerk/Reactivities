import './styles.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  // CDK20241016 - Use this hook to essentially move the Home Page out of the NavBar
  const location = useLocation();

  // CDK20241021 - Make Toasts available throughout the entire application.
  return (
    <>       
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />   
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container></>
      )}
    </>
  )
}

export default observer(App);
