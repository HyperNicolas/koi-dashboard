import { ThemeProvider } from 'styled-components';
import SimpleReactLightbox from 'simple-react-lightbox';
import { theme } from '../components/utils/styledComponents';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import '../styles/vars.css';
import 'antd/dist/antd.css';

const MyApp = ({ Component, pageProps }) => (
  <SimpleReactLightbox>
    <ThemeProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </SimpleReactLightbox>
);

export default MyApp;
