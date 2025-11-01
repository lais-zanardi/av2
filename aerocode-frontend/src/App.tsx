import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/layout/Sidebar'

export default function App() {
  return (
    <>
     {/* <h1 className="text-4xl font-bold text-blue-600">
      Tailwind funcionando! 💙
    </h1> */}
    <Sidebar />
    </>
  )
}
