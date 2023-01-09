Work in Progress. Project is beta. Use at your own risk. 
**Burning tokens is irreversible.**

# BURN SPL (Mainnet)

- `/program` - Solana Program Source and IDL (ProgramId: `FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg`)
- `/app` - Front end deployment using NextJS

The program allows users to create a tracking count seeded by `wallet` and `mint` so a user can have many token burn accounts. All future burns wiht that token will be logged in that PDA (so communities can track burn leaderboards and reward top burners).

This front end will allow users to navigate to `/mint/[MINT_ADDRESS]` to pull the leaderboard for the `MINT_ADDRESS` token. The front end will filter high scores only for desired tokens and facilitate burns just for that token. 

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
Update `app\utils\constants.ts` if you fork/deploy your own program.
- Also make sure reference to `.env` is correct in `SOLANA_RPC`

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
Creator/Authority: `MiLZAcWZgMYvFnZqzJ6XRj4h5r47bgX64Vt5gRnBvqv`
(will probably remove authority after some additional testing/feedback)