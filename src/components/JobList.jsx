import { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, TextField,
  Select, MenuItem, FormControl, InputLabel, Pagination,
  Box, Button, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { mockJobs } from '../data/mockData';
import JobModal from './JobModal';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [salary, setSalary] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsPerPage = 6;

  useEffect(() => {
    // In a real app, this would be an API call
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    let result = jobs;

    // Apply filters
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'all') {
      result = result.filter(job => job.category === category);
    }

    if (location !== 'all') {
      result = result.filter(job => job.location === location);
    }

    if (salary !== 'all') {
      result = result.filter(job => {
        const [min, max] = salary.split('-').map(Number);
        return job.salary >= min && job.salary <= max;
      });
    }

    setFilteredJobs(result);
    setPage(1);
  }, [searchTerm, category, location, salary, jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const paginatedJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search and Filters */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                label="Location"
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="mumbai">Mumbai</MenuItem>
                <MenuItem value="bangalore">Bangalore</MenuItem>
                <MenuItem value="delhi">Delhi</MenuItem>
                <MenuItem value="hyderabad">Hyderabad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Salary Range</InputLabel>
              <Select
                value={salary}
                label="Salary Range"
                onChange={(e) => setSalary(e.target.value)}
              >
                <MenuItem value="all">All Ranges</MenuItem>
                <MenuItem value="0-500000">₹0 - ₹5,00,000</MenuItem>
                <MenuItem value="500000-1000000">₹5,00,000 - ₹10,00,000</MenuItem>
                <MenuItem value="1000000-2000000">₹10,00,000 - ₹20,00,000</MenuItem>
                <MenuItem value="2000000-3000000">₹20,00,000+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {paginatedJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { boxShadow: 6 }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {job.company}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  📍 {job.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  💰 ₹{job.salary.toLocaleString('en-IN')}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedJob(job)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredJobs.length / jobsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Job Details Modal */}
      <JobModal
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </Container>
  );
};

export default JobList;
