Work in Progress. 

# BURN SPL (Mainnet)

- `/program` - Solana Program Source and IDL (ProgramId: `FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg`)
- `/app` - Front end deployment using NextJS

Though BonkBurn is bonk focused, the program, is generic. Burn accts are seeded by `wallet` and `mint` so a user can have many token burn accounts. This front end will filter high scores only for desired tokens and facilitate burns just for that token. 

PRs, issues, feedback welcome. Thanks! 🙏


## Getting Started (Front End)

```sh
cd app
```

```sh
npm install
#or
yarn
```

Create`.env`. 
Add `NEXT_PUBLIC_RPC`with your RPC (free ones available at [QuickNode](https://www.quicknode.com/))
Update `app\utils\constants.ts` as necessary:
- Make sure reference to `.env` is correct in `SOLANA_RPC`
- Update `TOKEN_CONFIG` to reflect your token of choice

```typescript
export const SOLANA_RPC: string = process.env.NEXT_PUBLIC_RPC as string;

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