import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import {UseProvider} from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }) {

  return 
  <UseProvider>
  <Component {...pageProps} />
  </UseProvider>
}

export default MyApp