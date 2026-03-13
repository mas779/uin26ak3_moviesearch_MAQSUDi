import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import Header from './components/Header'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:movie" element={<MoviePage />} />
      </Routes>
    </>
  )
}