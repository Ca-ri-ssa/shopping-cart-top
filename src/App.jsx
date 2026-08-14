import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'
import Navigation from './components/Navigation.jsx'
import { Outlet } from 'react-router'

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default App
