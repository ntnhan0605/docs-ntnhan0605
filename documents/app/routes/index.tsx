import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

export default function Home() {
  return (
    <Box className="container" display="flex" gap={2}>
      <Link to="/react">
        <Typography variant="h4">React</Typography>
      </Link>
    </Box>
  );
}
