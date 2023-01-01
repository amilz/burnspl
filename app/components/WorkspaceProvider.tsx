import { createContext, useContext, } from "react"
import {
    Program,
    AnchorProvider,
    Idl,
    setProvider,
} from "@project-serum/anchor"
import {
    BurnBonkIdl,
    IDL,
} from "../utils/idl"
import { Connection } from "@solana/web3.js"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import MockWallet from "./MockWallet"
import { PROGRAM_ID } from "../utils/constants"

const WorkspaceContext = createContext({})

interface WorkSpace {
  connection?: Connection
  provider?: AnchorProvider
  burnBonkProgram?: Program<BurnBonkIdl>
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet
  const { connection } = useConnection()

  const provider = new AnchorProvider(connection, wallet, {})
  setProvider(provider)

  const burnBonkProgram = new Program(IDL as Idl, PROGRAM_ID)



  const workspace = {
    connection,
    provider,
    burnBonkProgram,
  }

  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  )
}

const useWorkspace = (): WorkSpace => {
  return useContext(WorkspaceContext)
}

export { WorkspaceProvider, useWorkspace }