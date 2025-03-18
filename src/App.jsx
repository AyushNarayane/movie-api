import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'

export const SearchContext = createContext()

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
})

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <Router>
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </Container>
        </Router>
      </SearchContext.Provider>
    </ThemeProvider>
  )
}

export default App