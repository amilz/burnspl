X create token mint (assign auth to program)
X create cm 
- write program 
- build ui 



pub mod core_toly_token {
    use super::*;

    pub fn flip_coin(ctx: Context<FlipCoin>, user_selection: u8) -> Result<()> {
        let sol_payment = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.from.key(),
            TREASURY_WALLET.parse::<Pubkey>().unwrap(), 
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &sol_payment,
            &[
                ctx.accounts.from.to_account_info(),
                ctx.accounts.to.to_account_info(),
            ],
        );

        Ok(())
    }
}