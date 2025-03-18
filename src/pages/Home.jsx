import { useState, useEffect, useContext } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SearchContext } from '../App'

const API_KEY = 'fd983488'
const OMDB_API = 'https://www.omdbapi.com/'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [popularMovies, setPopularMovies] = useState([])
  const navigate = useNavigate()
  const { searchQuery } = useContext(SearchContext)
  
  useEffect(() => {
    console.log('useEffect triggered with searchQuery:', searchQuery)
    if (searchQuery.trim()) {
      searchMovies(searchQuery)
    } else {
      // Load popular movies when no search query is present
      fetchPopularMovies()
    }
  }, [searchQuery])

  const fetchPopularMovies = async () => {
    console.log('Fetching popular movies...')
    setLoading(true)
    setError(null)

    try {
      // Using a default popular search term
      console.log('Making API request to:', `${OMDB_API}?apikey=${API_KEY}&s=marvel`)
      const response = await axios.get(`${OMDB_API}?apikey=${API_KEY}&s=marvel`)
      console.log('Popular movies API response:', response.data)
      if (response.data.Response === 'True') {
        setPopularMovies(response.data.Search)
        setMovies([])
      } else {
        console.error('API error:', response.data.Error)
        setError('Failed to fetch popular movies.')
        setPopularMovies([])
      }
    } catch (err) {
      console.error('API request failed:', err)
      setError('Failed to fetch popular movies. Please try again.')
      setPopularMovies([])
    } finally {
      setLoading(false)
    }
  }

  const searchMovies = async (query) => {
    if (!query) return
    
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${OMDB_API}?apikey=${API_KEY}&s=${query}`)
      if (response.data.Response === 'True') {
        setMovies(response.data.Search)
      } else {
        setError(response.data.Error)
        setMovies([])
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <>
      {!searchQuery.trim() && popularMovies.length > 0 ? (
        <>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Popular Movies
          </Typography>
          <Grid container spacing={3}>
            {popularMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                  onClick={() => handleMovieClick(movie.imdbID)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.Title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.Year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : searchQuery.trim() && movies.length > 0 ? (
        <>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Search Results for "{searchQuery}"
          </Typography>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                  onClick={() => handleMovieClick(movie.imdbID)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.Title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.Year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : searchQuery.trim() && !loading && !error ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography>No movies found for "{searchQuery}"</Typography>
        </Box>
      ) : !searchQuery.trim() && !loading && !error && popularMovies.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography>Search for movies using the search bar above</Typography>
        </Box>
      ) : null}
    </>
  )
}

export default Home