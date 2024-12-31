import CustomThemeProvider from "./providers/CustomThemeProvider";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import SnackbarProvider from "./providers/SnackbarProvider";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <SnackbarProvider>
          <Layout>
            <Router />
          </Layout>
        </SnackbarProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
