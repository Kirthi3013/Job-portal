import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { toast } from 'react-toastify';

const JobModal = ({ job, open, onClose }) => {
  if (!job) return null;

  const handleApply = () => {
    toast.success('Application submitted successfully!');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {job.company}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Job Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={`💰 $${job.salary.toLocaleString()}`} />
            <Chip label={`📍 ${job.location}`} />
            <Chip label={`🏢 ${job.category}`} />
          </Box>
          <Typography variant="body1" paragraph>
            {job.description}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Requirements
          </Typography>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>
                <Typography variant="body1">{req}</Typography>
              </li>
            ))}
          </ul>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Benefits
          </Typography>
          <ul>
            {job.benefits.map((benefit, index) => (
              <li key={index}>
                <Typography variant="body1">{benefit}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleApply}>
          Apply Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobModal;
