import { ThemeProvider } from 'styled-components';
import { theme } from '../components/utils/styledComponents';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </>
);

export default MyApp;
