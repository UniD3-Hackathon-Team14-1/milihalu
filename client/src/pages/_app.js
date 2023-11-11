import '@/styles/globals.css'
import Navigator from '@/components/navigator'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Navigator />
    </>
  );
}
