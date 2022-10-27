# toly token flip to mint game
*submission to solana core alpha program (10/28ish/2022)*

1. user: select `heads` or `tails` and deposit `0.1` sol
2. program: determine if winner or not
3. if winner: send `1` $TOLY WL Token
    - program tracks number of wins in a row in a `streak` pda
    - (future) program tracks personal best record in `personal best` pda
    - (future) tracks global best record in `record` pda
4. (ish) user can use WL token to mint a toly token from candy machine
    - Candy machine's new [Candy Guards](https://docs.metaplex.com/programs/candy-machine/candy-guards) are not working atm w/ the JS SDK. 
    - Can easily add the guard when stable. 
    - Current work around is to just hide the candy machine component unless user has a mint token

### TO DO 

- Improve UX (eg loader handling etc. currently most action happens in console)
- Error handling 
- Add more program security checks
- Add some tests to program
- Implement candy guard when available/working. [Update instruction](https://docs.metaplex.com/programs/candy-machine/managing-candy-machines#update-authorities): 

```typescript
    async function updateCandyMachine () {
        const candyMachine = await METAPLEX
            .candyMachines()
            .findByAddress({ address: new PublicKey(CM_ADDY) });
        await METAPLEX.candyMachines().update({
            candyMachine,
            guards: {
                startDate: { date: toDateTime("2022-10-17T16:00:00Z") },
                tokenBurn: { amount: token(1), mint: new PublicKey(WL_TOKEN_ADDRESS),}
            }
        });
    }
```

### Key Variables: 
- Cluster: `devnet`
- ProgramId: `7b8ZM4sAdsL9hP9yjQpYDYKoPK8jdgjnQtQJXUBku6Kf`
- WLTokenMintId: `CmA4aTPgssfax6bUbk3Lw1LyxpeVJSvk2yPwaeoFAFGH` 
- CMID: `CbRj7MCjeSKggCV52Um7Fuoj5tJ6Lw2mPqALi1tvBRUv` (https://www.solaneyes.com/address/CbRj7MCjeSKggCV52Um7Fuoj5tJ6Lw2mPqALi1tvBRUv)
- Treasury: `demouAmvsq6CbpdWzVpfampXdzpFQMbDhei55DjzRCn`

### Running Front-end

Rename `.env.example` to `.env`. 
Update `NEXT_PUBLIC_RPC` with your devnet RPC or the public: `https://api.devnet.solana.com` 
From Terminal enter 
```sh
yarn dev
```