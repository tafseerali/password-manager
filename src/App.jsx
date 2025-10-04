import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'

function App() {

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-r from-sky-50 to-pink-50">
        <Manager/>
        <Footer/>
      </div>

    </>
  )
}

export default App