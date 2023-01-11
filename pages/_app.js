import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { MetaMaskProvider } from 'metamask-react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Layout from '../components/layout';
import Meta from '../components/Meta';
import UserContext from '../components/UserContext';
import { store } from '../redux/store';

// import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0
  });


  return (
    <>
      <Meta title="Home  || Riseabove | NFT Marketplace Next.js Template" />

      <Provider store={store}>
        <ToastContainer
          position="top-right"
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <UserContext.Provider value={{ scrollRef: scrollRef }}>
              {pid === "/login" ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </UserContext.Provider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
