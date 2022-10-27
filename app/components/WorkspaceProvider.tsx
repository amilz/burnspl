import { createContext, useContext, } from "react"
import {
    Program,
    AnchorProvider,
    Idl,
    setProvider,
} from "@project-serum/anchor"
import {
    CoreTolyToken,
    IDL as CoreTolyTokenIDL,
} from "../utils/core_toly_token"
import { Connection } from "@solana/web3.js"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import MockWallet from "./MockWallet"
import { PROGRAM_ID } from "../utils/constants"

const WorkspaceContext = createContext({})

interface WorkSpace {
  connection?: Connection
  provider?: AnchorProvider
  coreTolyProgram?: Program<CoreTolyToken>
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet
  const { connection } = useConnection()

  const provider = new AnchorProvider(connection, wallet, {})
  setProvider(provider)

  const coreTolyProgram = new Program(CoreTolyTokenIDL as Idl, PROGRAM_ID)



  const workspace = {
    connection,
    provider,
    coreTolyProgram,
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