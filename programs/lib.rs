use anchor_lang::prelude::*;
use anchor_spl::{
    token,
    token::{Token,Burn,Mint},
};
// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg");

#[program]
mod burn_board {
    use super::*;
    
    pub fn init_fungible_user(ctx: Context<InitFungibleUserConfig>, user_name: String) -> Result<()> {
        require!(user_name.len() <= 8, InitError::LongName);
        let burn_score_acct = &mut ctx.accounts.new_burn_score;
        burn_score_acct.burned_tokens = 0;
        burn_score_acct.num_burns = 0;
        burn_score_acct.user_name = user_name;
        burn_score_acct.pyro_key = ctx.accounts.signer.key();
        burn_score_acct.mint = ctx.accounts.mint.key();
        msg!("Initiated Burn Score for User: {} / Mint {}!", burn_score_acct.user_name, burn_score_acct.mint);
        Ok(())
    }
    
    pub fn burn_fungible(ctx: Context<BurnFungibleAccountsConfig>, amount: u64) -> Result<()> {
        require!(amount > 0 && amount < ctx.accounts.mint.supply, BurnError::InvalidAmount);
        require!(ctx.accounts.authority.key() == ctx.accounts.burn_score.pyro_key, BurnError::InvalidAccount);
        require!(ctx.accounts.mint.key() == ctx.accounts.burn_score.mint.key(), BurnError::InvalidToken);
        let cpi_accounts = Burn {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.from.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        let base: u64 = 10;
        let decimals:u8 = ctx.accounts.mint.decimals;
        let burn_amount = base.pow(decimals.into());
        token::burn(cpi_ctx, amount * burn_amount)?;
        ctx.accounts.burn_score.burned_tokens += amount;
        ctx.accounts.burn_score.num_burns += 1;
        msg!("Num Burns: {}", ctx.accounts.burn_score.burned_tokens); 
        msg!("Total Burned: {}", ctx.accounts.burn_score.num_burns); 
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitFungibleUserConfig<'info> {
    #[account(
        init, 
        payer = signer, 
        space = BurnScore::MAX_SIZE,
        seeds = [
            "fungibleuser".as_bytes().as_ref(), 
            mint.key().as_ref(), 
            signer.key().as_ref()
        ],
        bump
    )]
    pub new_burn_score: Account<'info, BurnScore>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub mint: Account<'info, Mint>,
}

#[account]
pub struct BurnScore {
    pub burned_tokens: u64,
    pub pyro_key: Pubkey,
    pub num_burns: u64,
    pub user_name: String,
    pub mint: Pubkey
}

impl BurnScore {
    pub const MAX_SIZE: usize = 
        8 // Discriminator
        + 8 // burned_tokens
        + 8 // num_burns
        + 32 // pyro_key
        + 32 // mint
        + 4 + 8; // user_name
}

#[derive(Accounts)]
pub struct BurnFungibleAccountsConfig<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    #[account(mut)]
    pub from: AccountInfo<'info>,
    pub authority: Signer<'info>,
    #[account(mut)]
    pub burn_score: Account<'info, BurnScore>,
}

#[error_code]
pub enum InitError {
    #[msg("Max Name legth (8) exceeded.")]
    LongName
}

#[error_code] 
pub enum BurnError {
    #[msg("Must burn > 0 tokens and less than total supply.")]
    InvalidAmount,
    #[msg("Invalid account signer must be same as used to initiate score")]
    InvalidAccount,
    #[msg("Invalid token mint for this user account")]
    InvalidToken
}