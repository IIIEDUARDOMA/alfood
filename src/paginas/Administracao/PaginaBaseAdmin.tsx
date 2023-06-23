import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  Link,
} from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

export default function PaginaBaseAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h5" sx={{ marginRight: '50px' }}>
              Administração
            </Typography>
            <Box>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novos">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: 'white' }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}>Novos Pratos</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, backgroundColor: '#FFFBF5' }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
