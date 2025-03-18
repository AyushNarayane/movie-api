import { useContext } from 'react'
import { AppBar, Toolbar, Typography, TextField, Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { SearchContext } from '../App'

const API_KEY = 'fd983488'
const OMDB_API = 'https://www.omdbapi.com/'

function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (event) => {
    const query = event.target.value
    setSearchQuery(query)

    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Movie Database
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar