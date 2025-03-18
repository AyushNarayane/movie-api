import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Card, CardMedia, Grid, Chip, CircularProgress } from '@mui/material'
import axios from 'axios'

const API_KEY = 'fd983488'
const OMDB_API = 'https://www.omdbapi.com/'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${OMDB_API}?apikey=${API_KEY}&i=${id}&plot=full`)
        if (response.data.Response === 'True') {
          setMovie(response.data)
        } else {
          setError(response.data.Error)
        }
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

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

  if (!movie) return null

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
              alt={movie.Title}
              sx={{ height: 'auto', width: '100%' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.Title} ({movie.Year})
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip label={movie.Rated} sx={{ mr: 1 }} />
            <Chip label={movie.Runtime} sx={{ mr: 1 }} />
            <Chip label={movie.Genre} />
          </Box>
          <Typography variant="h6" gutterBottom>
            Plot
          </Typography>
          <Typography paragraph>{movie.Plot}</Typography>
          <Typography variant="h6" gutterBottom>
            Cast & Crew
          </Typography>
          <Typography paragraph>
            <strong>Director:</strong> {movie.Director}
          </Typography>
          <Typography paragraph>
            <strong>Writers:</strong> {movie.Writer}
          </Typography>
          <Typography paragraph>
            <strong>Actors:</strong> {movie.Actors}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ratings
          </Typography>
          {movie.Ratings.map((rating, index) => (
            <Typography key={index} paragraph>
              <strong>{rating.Source}:</strong> {rating.Value}
            </Typography>
          ))}
          <Box sx={{ mt: 2 }}>
            <Typography paragraph>
              <strong>Awards:</strong> {movie.Awards}
            </Typography>
            <Typography paragraph>
              <strong>Box Office:</strong> {movie.BoxOffice}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MovieDetails