import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'
import Navigation from './components/Navigation.jsx'
import { Outlet } from 'react-router'
import { USER_ID_KEY } from './data/config.js'

function App() {
  const [session, setSession] = useState(true);

  const checkSession = () => {
    const inSession = Boolean(localStorage.getItem(USER_ID_KEY));
    setSession(inSession);
  }

  useEffect(() => {
    checkSession();
  }, [])

  const logOut = () => {
    const isConfirm = window.confirm("Do you want to log out?");
    if (isConfirm) {
      localStorage.removeItem(USER_ID_KEY);
      checkSession();
    };
  };

  return (
    <>
      <Navigation isLogged={session} onLogOut={logOut}/>
      <Outlet />
    </>
  )
}

export default App
