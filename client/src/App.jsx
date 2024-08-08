import React from 'react'
import NavBar from './Components/NavBar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import NewBill from './Components/NewBill.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/newBill' element={<NewBill/>}/>
       
      </Routes> 
      <Footer />
    </BrowserRouter>
  )
}

export default App