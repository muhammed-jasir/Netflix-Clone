import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ScrollToTop from './components/ScrollToTop'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import PlayerPage from './pages/PlayerPage'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv' element={<TvShows />} />
                    <Route path='/player/:type/:id' element={<PlayerPage />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App