import React, { useState } from 'react';
import { 
  CssBaseline, 
  ThemeProvider, 
  Container, 
  Box,
  Typography,
  useMediaQuery
} from '@mui/material';
import theme from './theme/theme';
import TreeView from './components/TreeView';
import { AppData } from './types';
import { initialData } from './data/initialData';

function App() {
  const [data, setData] = useState<AppData>(initialData);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleDataChange = (newData: AppData) => {
    setData(newData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 1,
                fontSize: isMobile ? '1.75rem' : '2.25rem'
              }}
            >
              Tree View Task Manager
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
                px: 2
              }}
            >
              Organize your tasks efficiently in an expandable tree structure
            </Typography>
          </Box>
          
          <TreeView data={data} onDataChange={handleDataChange} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;