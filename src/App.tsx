import {
  Box,
  Container,
  createTheme,
  GlobalStyles,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import "./App.css";
import Content from "./components/Content";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          paddingY: 6,
          height: "100%",
        }}
      >
        <Stack gap={4} height="100%">
          {/* title */}
          <Typography variant="h3" color="textPrimary">
            Reaction Speed Battle
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Content />
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
