import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Template from '../components/ClickTemplate'
import { HomeView } from '../components/HomeView'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <HomeView/>
  )
}
