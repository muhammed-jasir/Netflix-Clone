import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App