import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

function App() {

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gradient-to-r from-sky-50 to-pink-50">
        <Manager/>
      </div>

    </>
  )
}

export default App
