Bonk Burn

## Getting Started

```bash
npm install
#or
yarn
```

Create`.env`. 
Add `NEXT_PUBLIC_RPC` or `REACT_APP_SOLANA_RPC_HOST` with your RPC or the public: `https://api.devnet.solana.com` 
Update `app\utils\constants.ts` as necessary:
- Make sure reference to `.env` is correct in `SOLANA_RPC`
- Update `TOKEN_CONFIG` to reflect your token of choice

```typescript
export const SOLANA_RPC: string = process.env.REACT_APP_SOLANA_RPC_HOST as string;

export const TOKEN_CONFIG = {
    mint: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
    name: 'Bonk',
    symbol: 'BONK'
}
```
If deploying your own site, make sure to update `HomeView` component with your metadata 

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

////

Program: `FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg`
Creator: `MiLZAcWZgMYvFnZqzJ6XRj4h5r47bgX64Vt5gRnBvqv`