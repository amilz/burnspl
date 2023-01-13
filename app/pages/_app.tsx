import '../styles/globals.css'
import type { AppProps } from 'next/app'
import WalletContextProvider from '../components/WalletContextProvider'
import { WorkspaceProvider } from '../components/WorkspaceProvider'
import Head from 'next/head'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Burn SPL</title>
      <meta name="description" content={`Burn and track Solana SPL Tokens`} />
    </Head>
    <WalletContextProvider>
      <WorkspaceProvider>
        <Component {...pageProps} />
        <Footer/>
      </WorkspaceProvider>
    </WalletContextProvider>
  </>
  )
}
