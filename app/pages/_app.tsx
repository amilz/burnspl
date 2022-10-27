import '../styles/globals.css'
import type { AppProps } from 'next/app'
import WalletContextProvider from '../components/WalletContextProvider'
import { WorkspaceProvider } from '../components/WorkspaceProvider'

export default function App({ Component, pageProps }: AppProps) {
  return       (
    <WalletContextProvider>
      <WorkspaceProvider>
        <Component {...pageProps} />
      </WorkspaceProvider>
    </WalletContextProvider>
)
}
