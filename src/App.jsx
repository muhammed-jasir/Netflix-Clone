import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import ScrollToTop from './components/ScrollToTop'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import PlayerPage from './pages/PlayerPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './components/ForgotPassword'
import SearchPage from './pages/SearchPage'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer theme="dark" newestOnTop={true} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv' element={<TvShows />} />
                    <Route path='/player/:type/:id' element={<PlayerPage />} />
                    <Route path='/signin' element={<SigninPage />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/search' element={<SearchPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App