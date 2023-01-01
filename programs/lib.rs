use anchor_lang::prelude::*;
use anchor_spl::{
    token,
    token::{Token,Burn,Mint},
};
// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("BoNKsQizPccMb1a6VMsrX7kJWo5iCjnNLF6ABpvrfUjr");

#[program]
mod burn_bonk {
    use super::*;
    pub fn initialize(ctx: Context<InitializeBurnScoreCtx>, user_name: String) -> Result<()> {
        require!(user_name.len() >= 3, BonkError::ShortName);
        require!(user_name.len() <= 8, BonkError::LongName);
        let burn_score_acct = &mut ctx.accounts.new_burn_score;
        burn_score_acct.burned_bonk = 0;
        burn_score_acct.num_burns = 0;
        burn_score_acct.user_name = user_name;
        burn_score_acct.pyro_key = ctx.accounts.signer.key();
        msg!("Initiated Burn Score for {}: {} bonk burned!", ctx.accounts.new_burn_score.user_name, ctx.accounts.new_burn_score.burned_bonk);
        Ok(())
    }
    pub fn burn_token(ctx: Context<BurnTokenAccountsCtx>, amount: u64) -> Result<()> {
        require!(amount > 0 && amount < BONK_SUPPLY, BonkError::InvalidAmount);
        require!(ctx.accounts.authority.key() == ctx.accounts.burn_score.pyro_key, BonkError::InvalidAccount);
        let cpi_accounts = Burn {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.from.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        // Create the CpiContext we need for the request
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        // Execute anchor's helper function to burn tokens
        token::burn(cpi_ctx, amount * BONK_DIGITS)?;
        ctx.accounts.burn_score.burned_bonk += amount;
        ctx.accounts.burn_score.num_burns += 1;
        msg!("Num Burns: {}", ctx.accounts.burn_score.burned_bonk); 
        msg!("Total Burned: {}", ctx.accounts.burn_score.num_burns); 
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeBurnScoreCtx<'info> {
    #[account(
        init, 
        payer = signer, 
        space = BurnScore::MAX_SIZE,
        seeds = ["bonkburn".as_bytes().as_ref(), signer.key().as_ref()],
        bump
    )]
    pub new_burn_score: Account<'info, BurnScore>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct BurnScore {
    pub burned_bonk: u64,
    pub pyro_key: Pubkey,
    pub num_burns: u64,
    pub user_name: String,
}

impl BurnScore {
    pub const MAX_SIZE: usize = 
        8 // Discriminator
        + 8 // burned_bonk
        + 8 // num_burns
        + 32 // pyro_key
        + 4 + 8; // user_name
}


#[derive(Accounts)]
pub struct BurnTokenAccountsCtx<'info> {
    /// CHECK: This is the token that we want to burn
    #[account(
        mut,
        constraint = mint.key().as_ref() == BONK_MINT
    )]
    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    /// CHECK: This is the token account that we want to burn tokens from
    #[account(mut)]
    pub from: AccountInfo<'info>,
    /// CHECK: the authority of the token account
    pub authority: Signer<'info>,
    #[account(mut)]
    pub burn_score: Account<'info, BurnScore>,
}

const BONK_MINT: &[u8] = &[
  188,   7, 197, 110,  96, 173,  61,  63,
   23, 115, 130, 234, 198,  84, 143, 186,
   31, 211,  44, 253, 144, 202,   2, 179,
  231, 207, 161, 133, 253, 206, 115, 152
];
const BONK_DIGITS: u64 = 100000; // 5 digits
const BONK_SUPPLY: u64 = 99812675359681;

#[error_code] 
pub enum BonkError {
    #[msg("Name must have at least 3 characters")]
    ShortName,
    #[msg("Max Name legth (8) exceeded.")]
    LongName,
    #[msg("Must burn at least 1 BONK and less than total supply!")]
    InvalidAmount,
    #[msg("Invalid account signer must be same as used to initiate score")]
    InvalidAccount
}