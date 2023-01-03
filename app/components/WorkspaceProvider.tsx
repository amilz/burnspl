import { createContext, useContext, } from "react"
import {
    Program,
    AnchorProvider,
    Idl,
    setProvider,
} from "@project-serum/anchor"
import {
    BurnBoardIdl,
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
  burnBoardProgram?: Program<BurnBoardIdl>
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet
  const { connection } = useConnection()

  const provider = new AnchorProvider(connection, wallet, {})
  setProvider(provider)

  const burnBoardProgram = new Program(IDL as Idl, PROGRAM_ID)



  const workspace = {
    connection,
    provider,
    burnBoardProgram,
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